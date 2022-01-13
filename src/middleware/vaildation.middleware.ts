import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import  joi from "joi"

function validationMiddleWare(Schema:Joi.Schema):RequestHandler{
    return async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<void> =>{
        const validationOption={
            abortEarly:false,
            allowUnknown:true,
            stripUnKnown:true
        };
        try {
            const value = await Schema.validateAsync(
                req.body,
                validationOption
            )
            req.body = value
            next()
            
        } catch (e:any) {
            const errors:string[] = []
            e.details.forEach((error:Joi.ValidationErrorItem) =>{
                errors.push(error.message)
            })

            res.status(400).send({errors :errors})
            
        }
    }
}


export default validationMiddleWare