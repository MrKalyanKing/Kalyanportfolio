import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import router from './Routers/router.js';
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url';
const app=express();

const port=3000;
const URL=process.env.MONGOURL

//middleware

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
//cors

app.use(cors({
    origin:'*',
    methods: ['GET', 'POST','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization']
  }))
  
app.options('*',cors())


app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api',router)
app.use('/api/user',router)


app.get('/',(req,res)=>{
    res.send("Hello")
})

app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
    `);
});


app.listen(port,()=>{
    console.log(`App is Running on port ${port}`)
})

mongoose.connect(URL)
.then(()=>{
    console.log("DB Connected")
})
.catch((err)=>{
    console.log(err)
})
