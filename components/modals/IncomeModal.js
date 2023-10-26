import React from 'react'
import { useRef, useContext, useEffect} from 'react'
import Modal from '../Modal'
import { currencyFormatter } from '@/lib/utils'
import { financeContext } from '@/lib/store/finance-context'

const IncomeModal = ({show, onClose}) => {
    const amountRef = useRef()
    const descriptionRef = useRef()
    const {income, addIncomeItem,removeIncomeItem} = useContext(financeContext)

    const addIncomeHandler = async (e) => {
        e.preventDefault()
      
        const newIncome = {
          amount: amountRef.current.value,
          description: descriptionRef.current.value,
          createdAt: new Date(),
        }
        try{
        await addIncomeItem(newIncome)
        amountRef.current.value = 0
        descriptionRef.current.value = ""
        }catch(error){
            console.log(error)
        }
    }
      
      const deleteIncome = async (incomeId) => {
        try {
            await removeIncomeItem(incomeId)
        } catch (error) {
            console.log(error)   
        }
      }
        
  return (
    <Modal open={show} onClose={onClose}>
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
      {income && income.map((i) => {
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
  )
}

export default IncomeModal
