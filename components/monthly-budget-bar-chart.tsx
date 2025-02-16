"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", income: 4000, expenses: 3200 },
  { month: "Feb", income: 3800, expenses: 3100 },
  { month: "Mar", income: 4200, expenses: 3400 },
  { month: "Apr", income: 3900, expenses: 3300 },
  { month: "May", income: 4100, expenses: 3500 },
  { month: "Jun", income: 4300, expenses: 3600 },
]

export function MonthlyBudgetBarChart() {
  return (
    <ChartContainer
      config={{
        income: {
          label: "Income",
          color: "hsl(var(--chart-1))",
        },
        expenses: {
          label: "Expenses",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent indicator="dashed" />} />
          <Bar dataKey="income" fill="var(--color-income)" />
          <Bar dataKey="expenses" fill="var(--color-expenses)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

