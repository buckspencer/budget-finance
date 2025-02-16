"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BudgetItem {
  id: number
  name: string
  amount: number
  category: string
}

const incomeCategories = ["Salary", "Freelance", "Investments", "Rental Income", "Other"]

const expenseCategories = [
  "Housing",
  "Utilities",
  "Groceries",
  "Transportation",
  "Healthcare",
  "Entertainment",
  "Debt Payments",
  "Savings",
  "Other",
]

export default function BudgetPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [incomes, setIncomes] = useState<BudgetItem[]>([])
  const [expenses, setExpenses] = useState<BudgetItem[]>([])
  const [newIncome, setNewIncome] = useState({ name: "", amount: "", category: "" })
  const [newExpense, setNewExpense] = useState({ name: "", amount: "", category: "" })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin")
    } else if (status === "authenticated") {
      fetchIncomes()
      fetchExpenses()
    }
  }, [status, router])

  const fetchIncomes = async () => {
    const response = await fetch("/api/incomes")
    const data = await response.json()
    setIncomes(data)
  }

  const fetchExpenses = async () => {
    const response = await fetch("/api/expenses")
    const data = await response.json()
    setExpenses(data)
  }

  const addIncome = async () => {
    if (newIncome.name && newIncome.amount && newIncome.category) {
      const response = await fetch("/api/incomes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newIncome.name,
          amount: Number.parseFloat(newIncome.amount),
          category: newIncome.category,
        }),
      })
      const updatedIncomes = await response.json()
      setIncomes(updatedIncomes)
      setNewIncome({ name: "", amount: "", category: "" })
    }
  }

  const addExpense = async () => {
    if (newExpense.name && newExpense.amount && newExpense.category) {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newExpense.name,
          amount: Number.parseFloat(newExpense.amount),
          category: newExpense.category,
        }),
      })
      const updatedExpenses = await response.json()
      setExpenses(updatedExpenses)
      setNewExpense({ name: "", amount: "", category: "" })
    }
  }

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Budget</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incomes.map((income) => (
                <div key={income.id} className="flex justify-between items-center">
                  <span>
                    {income.name} ({income.category})
                  </span>
                  <span>${income.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="grid gap-2">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="income-category">Category</Label>
                  <Select
                    value={newIncome.category}
                    onValueChange={(value) => setNewIncome({ ...newIncome, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="income-name">Name</Label>
                  <Input
                    id="income-name"
                    value={newIncome.name}
                    onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="income-amount">Amount</Label>
                  <Input
                    id="income-amount"
                    type="number"
                    value={newIncome.amount}
                    onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={addIncome}>Add Income</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex justify-between items-center">
                  <span>
                    {expense.name} ({expense.category})
                  </span>
                  <span>${expense.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="grid gap-2">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="expense-category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="expense-name">Name</Label>
                  <Input
                    id="expense-name"
                    value={newExpense.name}
                    onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="expense-amount">Amount</Label>
                  <Input
                    id="expense-amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={addExpense}>Add Expense</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Income:</span>
              <span>${totalIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Expenses:</span>
              <span>${totalExpenses.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Remaining:</span>
              <span>${(totalIncome - totalExpenses).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

