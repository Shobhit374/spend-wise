import { connectToDB } from "@/lib/database";
import Income from "@/models/income";

export const POST = async (request) => {
    const {amount,description,createdAt} = await request.json()
    try{
        await connectToDB()
        const newIncome = new Income({
            amount,description,createdAt
        })

        await newIncome.save()
        return new Response(JSON.stringify(newIncome),{status:201})
    } catch(error){
        return new Response("Failed to add Income", {status:500})
    }
}

export const GET = async () => {
    try{
        await connectToDB()
        const income = await Income.find({})
        return new Response(JSON.stringify(income),{status: 200})
    } catch(error){
        return new Response("Fetch error",{status:500})
    }
}

export const DELETE = async (request) =>{
    const {id} = await request.json()
    try{
        await connectToDB()
        await Income.findByIdAndDelete(id)
        return new Response("Income deleted",{status:200})
    }catch(error){
        return new Response("Error deleting income", {status:500})
    }
}