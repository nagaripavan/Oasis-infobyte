import mangoose from 'mongoose';

const PersonSchema=new mangoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{timestamps:true})

export const LoginData = mangoose.model('LoginData',PersonSchema);