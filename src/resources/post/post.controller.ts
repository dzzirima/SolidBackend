// resposible for the routing
// so basically interfaces tells us what  we  need to include

import validationMiddleWare from "@/middleware/vaildation.middleware";
import Controller from "@/utils/interfaces/controller.interface";
import validate from "./post.validation"
import { Router } from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";
import HttpException from "@/utils/exceptions/http.exception";
import PostService from "./post.service";

class PostController implements Controller{
    public path ="post";
    public router =Router();
    private PostService = new PostService()

    constructor(){
        this.initialiseRoutes()
    }
    private initialiseRoutes() :void{
        this.router.post(
            `${this.path}`,
            validationMiddleWare(validate.create),this.create
        )
    }


    private create = async (
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Response | void> =>{
        try {

            const { title ,body} = req.body
            const post = await this.PostService.create(title,body)

            res.status(201).json({post})
            
        } catch (error) {
            next(new HttpException(400,"Cannot create a post"))
            
        }
    }

}

export default PostController