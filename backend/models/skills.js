import mongoose, { mongo } from "mongoose";

const skilSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
     type:String,
     required:true
    }
})

const skillmodel= new mongoose.model("skill",skilSchema)

export default skillmodel