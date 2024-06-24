
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {

  const {state, dispatch, remainingBudget, totalExpenses} = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        {/* <img src="/grafico.jpg" alt="Grafica de gastos" /> */}

        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage == 100 ? '#DC2626' : '#3b82f6',
            trailColor: '#F5F5F5',
            textColor: '#3b82f6',
            textSize: 8,
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded"
          onClick={() => dispatch({type: 'reset-app'})}
        >
          Resetear App
        </button>

      <AmountDisplay
        label="Presupuesto"
        amount={state.budget}
      />

      <AmountDisplay
        label="Disponible"
        amount={remainingBudget}
      />

      <AmountDisplay
        label="Gastado"
        amount={totalExpenses}
      />

      </div>
    </div>
  )
}
