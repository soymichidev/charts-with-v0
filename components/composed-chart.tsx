"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { getCostIndicators, type CostIndicatorData } from "@/services/getCostIndicators"
import { useEffect, useState } from "react"

const chartConfig = {
  totalCost: {
    label: "Total Cost",
    color: "var(--chart-1)", // Gray color for bars
  },
  cpm: {
    label: "CPM",
    color: "var(--chart-2)", // Blue color for CPM line
  },
  cpc: {
    label: "CPC",
    color: "var(--chart-3)", // Black color for CPC line
  },
} satisfies ChartConfig

export function ChartComposed() {
  const [data, setData] = useState<CostIndicatorData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const costData = await getCostIndicators()
        setData(costData)
      } catch (error) {
        console.error("Error fetching cost indicators:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Indicadores Costos</h3>
          <p className="text-sm text-muted-foreground">Cargando datos...</p>
        </div>
        <div className="min-h-[400px] w-full flex items-center justify-center">
          <div className="text-muted-foreground">Cargando gráfico...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Indicadores Costos</h3>
        <p className="text-sm text-muted-foreground">Inversión, CPM y CPC por Día</p>
      </div>

      <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis yAxisId="left" orientation="left" domain={[0, 100]} tickLine={false} axisLine={false} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 2.5]} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />

          <Bar yAxisId="left" dataKey="totalCost" fill="var(--color-totalCost)" radius={[2, 2, 0, 0]} opacity={0.8} />

          <Line
            yAxisId="right"
            dataKey="cpm"
            stroke="var(--color-cpm)"
            dot={{ r: 4, fill: "var(--color-cpm)" }}
            strokeWidth={2}
            connectNulls={false}
          />

          <Line
            yAxisId="right"
            dataKey="cpc"
            stroke="var(--color-cpc)"
            dot={{ r: 3, fill: "var(--color-cpc)" }}
            strokeWidth={2}
            connectNulls={false}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  )
}
