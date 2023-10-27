"use client"
import { useState} from "react"
import { currencyFormatter } from "@/lib/utils"
import ExpenseItem from "@/components/ExpenseItem"
import IncomeModal from "@/components/modals/IncomeModal"
import { Chart as ChartJS, ArcElement, Tooltip,Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement,Tooltip,Legend)

const DUMMY_DATA = [
  {
    id:1,
    title: "Food",
    color: "#FF0",
    total: 1000
  },
  {
    id:2,
    title: "Drinks",
    color: "#F0F",
    total: 600
  },
  {
    id:3,
    title: "Movies",
    color: "#5f3",
    total: 800
  },
  {
    id:4,
    title: "Laundry",
    color: "#5ff",
    total: 500
  },
]

export default function Home() {
const [IncomeModalOpen, setIncomeModalopen] = useState(false)
  return (
    <>
    <IncomeModal
    show = {IncomeModalOpen} onClose={setIncomeModalopen}
    />
    <div className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-grey-400 text-md">
          My Balance
        </small>
        <h2 className="text-4xl font-bold">{currencyFormatter(10000)}</h2>
      </section>
      <section className="flex items-center gap-2 py-3">
        <button onClick = {()=>{setExpenseModalopen(true)}} className="btn btn-primary">+ Expenses</button>
        <button onClick = {()=>{setIncomeModalopen(true)}} className="btn btn-primary-outline">+ Income</button>
      </section>
      {/* Expenses */}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {DUMMY_DATA.map(expense => {
            return (
              <ExpenseItem
              key={expense.id}
              color = {expense.color}
              title = {expense.title}
              total = {expense.total}
              />
            )
          })}
        </div>
      </section>
      {/*Chart Section*/}
      <section className="py-6">
        <h3 className="text-2xl">Stats</h3>
        <div className="w-1/2 mx-auto">
          <Doughnut data={{
            labels: DUMMY_DATA.map(expense => expense.title),
            datasets:[
              {
                label:"Expense",
                data: DUMMY_DATA.map(expense => expense.total),
                backgroundColor: DUMMY_DATA.map(expense => expense.color),
                borderColor: ["#222"],
                borderWidth: 5,
              },
            ],
          }} 
          />
        </div>
      </section>
    </div>
    </>
  )
}
