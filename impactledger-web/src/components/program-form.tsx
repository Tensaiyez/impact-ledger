'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Calendar, Wallet, User, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { 
  validateEthereumAddress, 
  validateProgramName, 
  validateDate, 
  validateDateRange 
} from '@/lib/validation'

export function ProgramForm() {
  const [formData, setFormData] = useState({
    name: '',
    tokenAddr: '',
    ownerAddr: '',
    startDate: '',
    endDate: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate program name
    const nameValidation = validateProgramName(formData.name)
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error || 'Invalid program name'
    }

    // Validate token address
    const tokenValidation = validateEthereumAddress(formData.tokenAddr)
    if (!tokenValidation.isValid) {
      newErrors.tokenAddr = tokenValidation.error || 'Invalid token address'
    }

    // Validate owner address
    const ownerValidation = validateEthereumAddress(formData.ownerAddr)
    if (!ownerValidation.isValid) {
      newErrors.ownerAddr = ownerValidation.error || 'Invalid owner address'
    }

    // Validate dates
    if (formData.startDate) {
      const startDateValidation = validateDate(formData.startDate)
      if (!startDateValidation.isValid) {
        newErrors.startDate = startDateValidation.error || 'Invalid start date'
      }
    }

    if (formData.endDate) {
      const endDateValidation = validateDate(formData.endDate)
      if (!endDateValidation.isValid) {
        newErrors.endDate = endDateValidation.error || 'Invalid end date'
      }
    }

    // Validate date range
    if (formData.startDate && formData.endDate) {
      const rangeValidation = validateDateRange(formData.startDate, formData.endDate)
      if (!rangeValidation.isValid) {
        newErrors.endDate = rangeValidation.error || 'Invalid date range'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the validation errors before submitting')
      return
    }

    // Sanitize data before sending
    const sanitizedData = {
      name: validateProgramName(formData.name).sanitized,
      tokenAddr: validateEthereumAddress(formData.tokenAddr).sanitized,
      ownerAddr: validateEthereumAddress(formData.ownerAddr).sanitized,
      startDate: formData.startDate ? validateDate(formData.startDate).sanitized : '',
      endDate: formData.endDate ? validateDate(formData.endDate).sanitized : '',
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      })

      if (response.ok) {
        const result = await response.json()
        toast.success(`Program created successfully! ID: ${result.id}`)
        resetForm()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to create program')
      }
    } catch (error) {
      toast.error('Failed to create program')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      tokenAddr: '',
      ownerAddr: '',
      startDate: '',
      endDate: '',
    })
    setErrors({})
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Create New Program</CardTitle>
        <p className="text-sm text-muted-foreground">
          Set up a new aid program with token and ownership details
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Program Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter program name"
              required
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <div className="flex items-center space-x-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tokenAddr" className="flex items-center space-x-2">
              <Wallet className="h-4 w-4" />
              <span>Token Address *</span>
            </Label>
            <Input
              id="tokenAddr"
              value={formData.tokenAddr}
              onChange={(e) => handleInputChange('tokenAddr', e.target.value)}
              placeholder="0x..."
              required
              className={errors.tokenAddr ? 'border-red-500' : ''}
            />
            {errors.tokenAddr && (
              <div className="flex items-center space-x-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.tokenAddr}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerAddr" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Owner Address *</span>
            </Label>
            <Input
              id="ownerAddr"
              value={formData.ownerAddr}
              onChange={(e) => handleInputChange('ownerAddr', e.target.value)}
              placeholder="0x..."
              required
              className={errors.ownerAddr ? 'border-red-500' : ''}
            />
            {errors.ownerAddr && (
              <div className="flex items-center space-x-1 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.ownerAddr}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Start Date</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className={errors.startDate ? 'border-red-500' : ''}
              />
              {errors.startDate && (
                <div className="flex items-center space-x-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.startDate}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>End Date</span>
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className={errors.endDate ? 'border-red-500' : ''}
              />
              {errors.endDate && (
                <div className="flex items-center space-x-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.endDate}</span>
                </div>
              )}
            </div>
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
              <span>{isLoading ? 'Creating...' : 'Create Program'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
