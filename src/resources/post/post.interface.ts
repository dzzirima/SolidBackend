import { Document } from "mongoose";


// we need handy functions which are present in Mongoose Document Object
export default interface Post extends Document{
    title:string,
    body:string
}