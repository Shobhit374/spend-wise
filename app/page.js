"use client"
import { useState, useRef, useEffect } from "react"
import { currencyFormatter } from "@/lib/utils"
import Modal from "@/components/Modal"
import ExpenseItem from "@/components/ExpenseItem"
import { Chart as ChartJS, ArcElement, Tooltip,Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { connectToDB } from "@/lib/database"

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
const [Income,setIncome] = useState([])

const [IncomeModalOpen, setIncomeModalopen] = useState(false)
const [ExpenseModalOpen, setExpenseModalopen] = useState(false)
const amountRef = useRef()
const descriptionRef = useRef() 

//Handler
const addIncomeHandler = async (e) => {
  e.preventDefault()

  const newIncome = {
    amount: amountRef.current.value,
    description: descriptionRef.current.value,
    createdAt: new Date(),
  }
  console.log(newIncome)
  try {
    const res = await fetch("api/newIncome", {
      method: "POST",
      body: JSON.stringify({
        amount: amountRef.current.value,
        description: descriptionRef.current.value,
        createdAt: new Date(),
      }),
    })
    if(res.ok){
      console.log("AddIncome Succesfull")
      const dt = await res.json()
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            ...dt
          },
        ]
      })
      amountRef.current.value = 0
      descriptionRef.current.value = ""
    }
  } catch(error){
    console.log(error)
  }
}
  
  const getIncomeData = async () => {
    const res = await fetch("api/newIncome")
    const data = await res.json();
    setIncome(data)
  }

  useEffect(() => {
    getIncomeData()
  },[])

  const deleteIncome = async (incomeId) => {
    try{
      const res = await fetch("api/newIncome", {
      method: "DELETE",
      body: JSON.stringify({
        id:incomeId,
      }),
      })
      if(res.ok){
        const filtered = Income.filter((item) => item._id !== incomeId)
        setIncome(filtered)
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
    <Modal open={IncomeModalOpen} onClose={setIncomeModalopen}>
      <form onSubmit={addIncomeHandler} className="inp" action="">
        <div className="inp">
          <label htmlFor="amount">Income Amount</label>
          <input 
          type="number" name="amount" ref={amountRef} min={0.01} step={0.01} placeholder="Enter Income Amount"
          required />
        </div>

        <div className="inp">
          <label htmlFor="description">Description</label>
          <input 
          type="text" name="description" ref={descriptionRef} placeholder="Enter Income Description"
          required />
        </div>
        <button className="btn btn-primary">
          Add Entry
        </button>
      </form>
    <div className="flex flex-col gap-4 mt-6">
      <h3 className="text-2xl font-bold">Income History</h3>
      {Income.map((i) => {
        return (
          <div className="flex justify-between item-center" key={i._id}>
            <div>
              <p className="font-semibold">{i.description}</p>
              <p className="text-xs">{i.createdAt}</p>
            </div>
            <p className="flex items-center gap-2">
              {currencyFormatter(i.amount)}
              <button onClick={() => {deleteIncome(i._id)}} className="w-7 h-7 font-bold rounded-full bg-slate-800">
            X
          </button>
            </p>
          </div>
        )
      })}
    </div>
    </Modal>
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
