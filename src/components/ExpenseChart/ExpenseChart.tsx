'use client'
import {
  ChartContainer,
  ChartTooltipContent,
  Recharts,
} from '@pellegrinidev/piggy-ui'
import { LoaderIcon } from 'lucide-react'
import NotFoundItems from '../NotFoundItems/NotFoundItems'

interface ChartByCategoryProps {
  data: {
    name: string
    total: number
    fill: string
  }[]
  config: Record<string, { label: string; theme: { light: string; dark: string } }>
  chartType: 'expense' | 'income'
  isLoading: boolean
}

export default function ChartByCategory({
  data,
  config,
  chartType,
  isLoading
}: ChartByCategoryProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <LoaderIcon className="animate-spin text-brand-500" />
      </div>
    )
  }

  if (!data?.length || !config) {
    return (
      <div className='h-96 w-full aspect-auto'>
        <NotFoundItems height />
      </div>
    )
  }

  return (
    <ChartContainer config={config} id={`bar-chart-${chartType}`} className="h-full w-full aspect-auto">
      <Recharts.BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <Recharts.CartesianGrid strokeDasharray="3 3" />
        <Recharts.XAxis dataKey="name" />
        <Recharts.YAxis />
        <Recharts.Tooltip
          content={<ChartTooltipContent />}
          formatter={(value: number) =>
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value)
          }
        />
        <Recharts.Bar dataKey="total">
          {data.map((entry, index) => (
            <Recharts.Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Recharts.Bar>
      </Recharts.BarChart>
    </ChartContainer>
  )
}
