import authenticatedMiddleWare from "@/middleware/authenticated.middleware";
import validationMiddleWare from "@/middleware/vaildation.middleware";
import HttpException from "@/utils/exceptions/http.exception";
import { NextFunction, Request, Response, Router } from "express";
import UserService from "./user.service";
import userValidation from "./user.validation";

class UserController {
    public path = '/user';
    public router = Router();
    private UserService = new UserService()

    constructor() {
        this.initialiseRoutes()

        
    }

    private initialiseRoutes() :void{
        this.router.post(
            `${this.path}/register`,
            validationMiddleWare(userValidation.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleWare(userValidation.login),
            this.login
        );
        this.router.get(`${this.path}`,authenticatedMiddleWare,this.getUser);
    }

    private register = async (req:Request, res:Response , next:NextFunction):Promise<void| Response> =>{
        try {
            const {name,email,password } = req.body

            const token = await this.UserService.register(name,email,password,'user')

            res.status(201).json({token})
        } catch (error :any) {
            next(new HttpException (400,error.message))
            
        }
    }

    private login = async (
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Response | void> =>{
        try {
            const {email, password } = req.body
            const token = await this.UserService.login(email,password)
            
            res.status(200).json({token})

        } catch (error:any) {
            next(new HttpException(404,error.message))
        }
    }

    private getUser = (
        req:Request,
        res:Response,
        next:NextFunction,
    ):Response|void =>{
        if(!req.user){
            return next(new HttpException(404,'No logged in user'))
        }
        res.status(200).json({user:req.user})
    }


}


export default UserController