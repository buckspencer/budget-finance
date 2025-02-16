import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getExpenses, setExpenses } from "@/lib/kv"

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.email as string
  const expenses = await getExpenses(userId)
  return NextResponse.json(expenses)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.email as string
  const expense = await request.json()
  const expenses = await getExpenses(userId)
  expenses.push({ ...expense, id: Date.now() })
  await setExpenses(userId, expenses)
  return NextResponse.json(expenses)
}

