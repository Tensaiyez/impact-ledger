'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MilestoneForm } from '@/components/milestone-form'
import { Target, Plus, DollarSign, Package, CheckCircle } from 'lucide-react'

interface Milestone {
  id: string
  name: string
  amount: number
  criteria: any
  createdAt: string
  program: {
    name: string
  }
  _count: {
    disbursements: number
  }
}

export default function MilestonesPage() {
  const params = useParams()
  const programId = params.programId as string
  
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchMilestones = async () => {
    try {
      const response = await fetch(`/api/milestones?programId=${programId}`)
      if (response.ok) {
        const data = await response.json()
        setMilestones(data || [])
      }
    } catch (error) {
      console.error('Failed to fetch milestones:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMilestones()
  }, [programId])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatCriteria = (criteria: any) => {
    if (typeof criteria === 'string') {
      try {
        criteria = JSON.parse(criteria)
      } catch {
        return criteria
      }
    }
    
    if (criteria.description) {
      return criteria.description
    }
    
    return JSON.stringify(criteria)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Milestones</h1>
          <p className="text-muted-foreground">
            Manage program milestones and track progress
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Milestone</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Milestone</DialogTitle>
              <DialogDescription>
                Define a new milestone with funding amount and completion criteria.
              </DialogDescription>
            </DialogHeader>
            <MilestoneForm 
              programId={programId} 
              onSuccess={() => {
                setIsDialogOpen(false)
                fetchMilestones()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading milestones...</div>
        </div>
      ) : milestones.length === 0 ? (
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No milestones found</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first milestone to start tracking program progress
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Milestone</span>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Criteria</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((milestone) => (
                <TableRow key={milestone.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{milestone.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {milestone.program.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {formatCurrency(milestone.amount)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate text-sm">
                      {formatCriteria(milestone.criteria)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="text-muted-foreground">
                        {milestone._count.disbursements} disbursements
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Active</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {new Date(milestone.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
