import mongoose from "mongoose";


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cartdata:{
        type:String,
        Object:{}
    }
},{minimize:false})

 const UserModel=mongoose.model.user|| mongoose.model('user',UserSchema)

 export default UserModel


