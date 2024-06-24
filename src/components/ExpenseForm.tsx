
import { ChangeEvent, useEffect, useState } from 'react';

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { categories } from "../data/categories";
import { DraftExpense } from '../types';

import type {DateValue} from '../types/index'
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

export default function ExpenseForm() {

  const {state, dispatch, remainingBudget} = useBudget()
  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)

  useEffect(() => {
    if(state.editingId) {
      const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0]

      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }
  }, [state.editingId])

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    name: '',
    category: '',
    date: new Date(),
  })

  const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target
    const isAmountField = ['amount'].includes(name)

    setExpense({
      ...expense,
      [name] : isAmountField ? Number(value) : value
    })
  }

  const handleChangeDate = (value : DateValue) => {
    // To cast the Date value as the DateValue type required by the Calendar
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate no fields are empty
    if(Object.values(expense).includes('')) {
      setError('Error, todos los campos son obligatorios.')
      return
    }

    // Validate Expense is not bigger than reminaing budget
    if((expense.amount - previousAmount) > remainingBudget) {
      setError('Gasto mayor al presupuesto remanente.')
      return
    }

    // Update or Add new Expense
    if(state.editingId) {
      dispatch({type: 'update-expense', payload: {expense: {...expense, id: state.editingId}}})
    } else {
      dispatch({type: 'add-expense', payload: {expense}})
    }
    // Reset State
    setExpense({
      amount: 0,
      name: '',
      category: '',
      date: new Date(),
    })
  }


  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? 'Actualizar Gasto' : 'Registrar Nuevo Gasto'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xl">
          Nombre Gasto:
        </label>


        <input 
          type="text"
          id='name'
          name="name"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          value={expense.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Total:
        </label>

        <input 
          type="text"
          id='amount'
          name="amount"
          placeholder="Añade cantidad"
          className="bg-slate-100 p-2"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>

        <select
          id='category'
          name="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option value={category.id} key={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha:
        </label>
        <DatePicker 
          id='date'
          name='date'
          className="bg-slate-100 p-2"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input 
        type="submit" 
        className="bg-blue-500 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? 'Actualizar' : 'Registrar Gasto'} 
      />
    </form>    
  )
}
