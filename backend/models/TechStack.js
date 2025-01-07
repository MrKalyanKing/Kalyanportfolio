import mongoose, { Schema } from "mongoose";

const techSchema=new Schema({
    icon:{
        type:String,
        required:true
    }
})

const techModel=new mongoose.model("techstack",techSchema)

export default techModel