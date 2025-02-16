import { kv } from "@vercel/kv"

export async function getIncomes(userId: string) {
  return (await kv.get(`user:${userId}:incomes`)) || []
}

export async function setIncomes(userId: string, incomes: any[]) {
  await kv.set(`user:${userId}:incomes`, incomes)
}

export async function getExpenses(userId: string) {
  return (await kv.get(`user:${userId}:expenses`)) || []
}

export async function setExpenses(userId: string, expenses: any[]) {
  await kv.set(`user:${userId}:expenses`, expenses)
}

