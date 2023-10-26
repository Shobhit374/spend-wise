"use client"
import { createContext, useState ,useEffect} from "react";

export const financeContext = createContext({
    income: [],
    addIncomeItem: async () => {},
    removeIncomeItem: async () => {},
})

export default function FinanceContextProvider({children}){
    const [income,setIncome] = useState([])
    const addIncomeItem = async (newIncome) => {
        try {
          const res = await fetch("api/newIncome", {
            method: "POST",
            body: JSON.stringify({
              amount: newIncome.amount,
              description: newIncome.description,
              createdAt: newIncome.createdAt,
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
          }
        } catch(error){
          console.log(error)
        }
    }
    const removeIncomeItem = async (incomeId) => {
        try{
            const res = await fetch("api/newIncome", {
            method: "DELETE",
            body: JSON.stringify({
              id:incomeId,
            }),
            })
            if(res.ok){
              const filtered = income.filter((item) => item._id !== incomeId)
              setIncome(filtered)
              console.log(income)
            }
          }catch(error){
            console.log(error)
          }
    }
    
    const values = {income,addIncomeItem,removeIncomeItem}

    const getIncomeData = async () => {
        const res = await fetch("api/newIncome")
        const data = await res.json();
        setIncome(data)
      }
    
      useEffect(() => {
        getIncomeData()
      },[])
      

    return (
    <financeContext.Provider value={values}>
        {children}
    </financeContext.Provider>
    )
}