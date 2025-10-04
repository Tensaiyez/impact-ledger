'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Target, DollarSign, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface MilestoneFormProps {
  programId: string
  onSuccess?: () => void
}

export function MilestoneForm({ programId, onSuccess }: MilestoneFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    criteria: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.amount || !formData.criteria) {
      toast.error('Name, Amount, and Criteria are required')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/milestones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programId,
          ...formData,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        toast.success(`Milestone created successfully! ID: ${result.id}`)
        resetForm()
        onSuccess?.()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to create milestone')
      }
    } catch (error) {
      toast.error('Failed to create milestone')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      amount: '',
      criteria: '',
    })
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Create New Milestone</CardTitle>
        <p className="text-sm text-muted-foreground">
          Define a milestone with funding amount and completion criteria
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Milestone Name *</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter milestone name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Amount (USD) *</span>
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="criteria" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Completion Criteria (JSON) *</span>
            </Label>
            <Textarea
              id="criteria"
              value={formData.criteria}
              onChange={(e) => handleInputChange('criteria', e.target.value)}
              placeholder='{"description": "Complete infrastructure project", "requirements": ["materials", "labor", "inspection"]}'
              rows={4}
              required
            />
            <p className="text-xs text-muted-foreground">
              Enter valid JSON describing the milestone completion criteria
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
              <span>{isLoading ? 'Creating...' : 'Create Milestone'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
