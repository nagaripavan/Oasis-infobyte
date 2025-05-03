import mangoose from 'mongoose';

export const ConnectDB = async ()=>{
    const MONGODB_URL='mongodb+srv://pawan:pawan123@cluster0.e6esj8y.mongodb.net/express';
await mangoose.connect(MONGODB_URL).then(()=>console.log("database connected"));
}