import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Expense {
  id: number
  name: string
  amount: number
  category: string
}

const expenses: Expense[] = [
  { id: 1, name: "Rent", amount: 1200, category: "Housing" },
  { id: 2, name: "Groceries", amount: 400, category: "Food" },
  { id: 3, name: "Utilities", amount: 200, category: "Bills" },
  { id: 4, name: "Transportation", amount: 150, category: "Travel" },
  { id: 5, name: "Entertainment", amount: 100, category: "Leisure" },
]

export function ExpenseList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li key={expense.id} className="flex justify-between items-center">
              <span className="font-medium">{expense.name}</span>
              <span className="text-red-600">${expense.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

