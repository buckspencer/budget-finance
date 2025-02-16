import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Income {
  id: number
  name: string
  amount: number
  category: string
}

const incomes: Income[] = [
  { id: 1, name: "Salary", amount: 3000, category: "Employment" },
  { id: 2, name: "Freelance Work", amount: 500, category: "Self-employment" },
  { id: 3, name: "Dividends", amount: 200, category: "Investments" },
  { id: 4, name: "Rental Income", amount: 300, category: "Real Estate" },
]

export function IncomeList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {incomes.map((income) => (
            <li key={income.id} className="flex justify-between items-center">
              <span className="font-medium">{income.name}</span>
              <span className="text-green-600">${income.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

