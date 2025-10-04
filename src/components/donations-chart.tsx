'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const data = [
  { week: 'Week 1', donations: 400000 },
  { week: 'Week 2', donations: 300000 },
  { week: 'Week 3', donations: 500000 },
  { week: 'Week 4', donations: 450000 },
  { week: 'Week 5', donations: 600000 },
  { week: 'Week 6', donations: 550000 },
  { week: 'Week 7', donations: 700000 },
  { week: 'Week 8', donations: 650000 },
]

export function DonationsChart() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Donations Trend</CardTitle>
        <p className="text-sm text-muted-foreground">
          Total donations received over the past 8 weeks
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="week" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Area
                type="monotone"
                dataKey="donations"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
