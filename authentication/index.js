import express from 'express';
import { LoginData } from './models/login.js';
import { ConnectDB } from './config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app=express()
const PORT=3000

await ConnectDB()

app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json())


app.get('/', (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const verify = jwt.verify(token, "f3A7kL9qW8xZ2bTmYpC1vEr6NhUdJ0Xs");
            res.sendFile(path.join(__dirname, 'public', 'tributepage.html'));
        } catch (err) {
            res.clearCookie("jwt");
            res.sendFile(path.join(__dirname, 'public', 'login.html'));
        }
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});


app.post('/register',async (req,res)=>{
    try{
        console.log(req.body);

        const {username,password}=req.body
        const check=await LoginData.findOne({username:username})
        if(check){
            res.status(400).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const Users=new LoginData({
            username,
            password:hashedPassword,
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
    const token = jwt.sign({ username: user.username }, "f3A7kL9qW8xZ2bTmYpC1vEr6NhUdJ0Xs", { expiresIn: '10m' });
    res.cookie("jwt",token,{
        maxAge:600000,
        httpOnly:true,
    })
    res.status(200).json({ message: "Login successful" });
})
 

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})