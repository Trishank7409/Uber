import express from "express";
import cors from "cors";
import dotenv from 'dotenv'

const port=process.env.PORT || 5000;
dotenv.config()
const app= express();
app.use(cors());
app.listen(port,()=>{
console.log(`listening on ${port}`)
})