import { model, Schema } from "mongoose";
import User from "./user.interface";
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
},{timestamps:true});

UserSchema.pre <User>("save" ,async function(next){
    // check if password is modified
    if(!this.isModified('password')){
        return next()
    }

    const hash = await  bcrypt.hash(this.password as string , 10)
    this.password = hash
    next()

})

UserSchema.methods.isValidPassword = async function(password:string) :Promise<boolean |Error>{

    return await  bcrypt.compare(password,this.password)
}





export default model<User>('User',UserSchema)