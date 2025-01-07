import mongoose, { Schema } from "mongoose";

const contactSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    }
})

const contactModel =new mongoose.model("contact",contactSchema)

export default contactModel