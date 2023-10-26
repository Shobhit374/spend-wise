import { Schema, model,models } from "mongoose";

const IncomeSchema = new Schema({
    amount:{
        type: Number,
        required: [true,"Amount Required"],
    },
    description:{
        type:String,
        required: [true,"Description required"],
    },
    createdAt:{
        type: Date,
        required: [true,"Date required"],
    }
})

const Income = models.Income || model('Income',IncomeSchema)

export default Income