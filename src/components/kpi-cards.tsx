'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  TrendingUp, 
  Package, 
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

function KPICard({ title, value, change, icon: Icon, description }: KPICardProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            {change.type === 'increase' ? (
              <ArrowUpRight className="h-3 w-3 text-green-600" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-600" />
            )}
            <span className={change.type === 'increase' ? 'text-green-600' : 'text-red-600'}>
              {Math.abs(change.value)}%
            </span>
            <span>from last month</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function KPICards() {
  // Mock data - in a real app, this would come from API calls
  const kpis = [
    {
      title: 'Total Donations',
      value: '$2,450,000',
      change: { value: 12.5, type: 'increase' as const },
      icon: DollarSign,
      description: 'Across all programs'
    },
    {
      title: 'Released to Field',
      value: '$1,890,000',
      change: { value: 8.2, type: 'increase' as const },
      icon: TrendingUp,
      description: '77% of total donations'
    },
    {
      title: 'Active Programs',
      value: '12',
      change: { value: 2.1, type: 'increase' as const },
      icon: Package,
      description: 'Currently running'
    },
    {
      title: 'PoDs Submitted',
      value: '1,247',
      change: { value: 15.3, type: 'increase' as const },
      icon: ShieldCheck,
      description: 'Proof-of-delivery records'
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
}
