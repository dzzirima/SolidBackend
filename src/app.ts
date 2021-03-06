import express , {Application} from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan"
import Controller from "@/utils/interfaces/controller.interface";
import helmet from "helmet"
import errorMiddleware from "./middleware/error.middleware";
class App {
    public express:Application
    public port:number

    constructor(controllers:Controller[] , port:number) {
        this.express = express()
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling()
        
    }
    private initialiseMiddleware():void{
        this.express.use(helmet())
        this.express.use(cors())
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:false}))
        this.express.use(compression())
    }

    private initialiseControllers(controllers:Controller[]):void{
        controllers.forEach((controller =>{
            this.express.use("/api",controller.router)
        }))
    }

    private initialiseErrorHandling():void{
         this.express.use(errorMiddleware)
    }
    private initialiseDatabaseConnection():void{
        const { MONGO_URL } = process.env;

        mongoose.connect(`${MONGO_URL}`)
    }

    public listen() :void{
        try {
            this.express.listen(this.port,()=>{
                console.log(`App Listening on Port :${this.port}`)
            })
        } catch (error) {
            console.log("Shutting down the server")
            console.log(error)
            process.exit(1)
            
        }
    }

}

export default App;