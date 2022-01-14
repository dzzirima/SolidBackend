import { Document } from "mongoose"

export default interface User extends Document {
    email:String;
    name:String;
    password:String;
    role:String;


    isValidPassword(password:string):Promise<Error|boolean>

}