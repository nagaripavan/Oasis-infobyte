import express from 'express'
import { LoginData } from './models/login.js'
import { ConnectDB } from './config/db.js'
import bcrypt from 'bcryptjs';
import cors from 'cors';


const app=express()
const PORT=3000

await ConnectDB()

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.post('/register',async (req,res)=>{
    console.log(req.body);
    try{
        const {username,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        const Users=new LoginData({
        username,
        password:hashedPassword
    })
    await Users.save()
    res.json({ message: "User  registered" });
    }catch(error)
    {
        res.status(400).send(error.message)
    }
})

app.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const user=await LoginData.findOne({username})
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(401).json({message:"Invalid Username and Password !"});
    }
    res.status(200).json({ message: "Login successful" });
})
 

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})