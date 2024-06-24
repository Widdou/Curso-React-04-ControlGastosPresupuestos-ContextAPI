export type Expense = {
  id: string
  name: string
  amount: number
  category: string
  date: DateValue
}

export type DraftExpense = Omit<Expense, 'id'>

type DateValuePiece = Date | null;
export type DateValue = DateValuePiece | [DateValuePiece, DateValuePiece];

export type Category = {
  id: string
  name: string
  icon: string
}