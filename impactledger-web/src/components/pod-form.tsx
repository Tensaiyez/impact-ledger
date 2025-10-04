'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, MapPin, Camera, Hash } from 'lucide-react'
import { toast } from 'sonner'
import { offlineManager } from '@/lib/offline'

export function PodForm() {
  const [formData, setFormData] = useState({
    disbursementId: '',
    beneficiaryId: '',
    gpsLat: '',
    gpsLng: '',
    photoUri: '',
    podHash: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser')
      return
    }

    setIsGettingLocation(true)
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        })
      })

      setFormData(prev => ({
        ...prev,
        gpsLat: position.coords.latitude.toString(),
        gpsLng: position.coords.longitude.toString(),
      }))
      toast.success('Location captured successfully')
    } catch (error) {
      toast.error('Failed to get location')
    } finally {
      setIsGettingLocation(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.disbursementId || !formData.beneficiaryId) {
      toast.error('Disbursement ID and Beneficiary ID are required')
      return
    }

    setIsLoading(true)
    
    const payload = {
      disbursementId: formData.disbursementId,
      beneficiaryId: formData.beneficiaryId,
      gpsLat: formData.gpsLat ? parseFloat(formData.gpsLat) : undefined,
      gpsLng: formData.gpsLng ? parseFloat(formData.gpsLng) : undefined,
      photoUri: formData.photoUri || undefined,
      podHash: formData.podHash || undefined,
    }

    try {
      if (navigator.onLine) {
        const response = await fetch('/api/pods', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          const result = await response.json()
          toast.success(`PoD submitted successfully! ID: ${result.id}`)
          resetForm()
        } else {
          const error = await response.json()
          toast.error(error.error || 'Failed to submit PoD')
        }
      } else {
        // Offline mode - queue the request
        await offlineManager.queueRequest('/api/pods', 'POST', payload)
        toast.success('PoD queued offline; will sync when connection is restored')
        resetForm()
      }
    } catch (error) {
      if (navigator.onLine) {
        toast.error('Failed to submit PoD')
      } else {
        // Try to queue offline
        try {
          await offlineManager.queueRequest('/api/pods', 'POST', payload)
          toast.success('PoD queued offline; will sync when connection is restored')
          resetForm()
        } catch (queueError) {
          toast.error('Failed to queue PoD offline')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      disbursementId: '',
      beneficiaryId: '',
      gpsLat: '',
      gpsLng: '',
      photoUri: '',
      podHash: '',
    })
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Submit Proof-of-Delivery</CardTitle>
        <p className="text-sm text-muted-foreground">
          Record delivery confirmation with location and photo evidence
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="disbursementId">Disbursement ID *</Label>
              <Input
                id="disbursementId"
                value={formData.disbursementId}
                onChange={(e) => handleInputChange('disbursementId', e.target.value)}
                placeholder="Enter disbursement ID"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="beneficiaryId">Beneficiary ID *</Label>
              <Input
                id="beneficiaryId"
                value={formData.beneficiaryId}
                onChange={(e) => handleInputChange('beneficiaryId', e.target.value)}
                placeholder="Enter beneficiary ID"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>GPS Location</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="flex items-center space-x-2"
              >
                {isGettingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                <span>{isGettingLocation ? 'Getting...' : 'Get Location'}</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gpsLat">Latitude</Label>
                <Input
                  id="gpsLat"
                  type="number"
                  step="any"
                  value={formData.gpsLat}
                  onChange={(e) => handleInputChange('gpsLat', e.target.value)}
                  placeholder="e.g., 40.7128"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gpsLng">Longitude</Label>
                <Input
                  id="gpsLng"
                  type="number"
                  step="any"
                  value={formData.gpsLng}
                  onChange={(e) => handleInputChange('gpsLng', e.target.value)}
                  placeholder="e.g., -74.0060"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photoUri">Photo URL</Label>
            <div className="flex items-center space-x-2">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <Input
                id="photoUri"
                value={formData.photoUri}
                onChange={(e) => handleInputChange('photoUri', e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="podHash">PoD Hash (optional)</Label>
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <Input
                id="podHash"
                value={formData.podHash}
                onChange={(e) => handleInputChange('podHash', e.target.value)}
                placeholder="0x..."
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Leave empty to auto-generate from form data
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isLoading ? 'Submitting...' : 'Submit PoD'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
