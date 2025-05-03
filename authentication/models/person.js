import mangoose from 'mongoose';

const PersonSchema=new mangoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true,unique:true},
},{timestamps:true})

export const Person = mangoose.model('Person',PersonSchema);