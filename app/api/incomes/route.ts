import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getIncomes, setIncomes } from "@/lib/kv"

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.email as string
  const incomes = await getIncomes(userId)
  return NextResponse.json(incomes)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.email as string
  const income = await request.json()
  const incomes = await getIncomes(userId)
  incomes.push({ ...income, id: Date.now() })
  await setIncomes(userId, incomes)
  return NextResponse.json(incomes)
}

