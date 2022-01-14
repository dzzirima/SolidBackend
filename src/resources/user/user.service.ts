import Token from "@/utils/interfaces/token.interface";
import token from "@/utils/token";
import userModel from "./user.model";

class userService {
    private user = userModel;

    /**
     * Register  a new user
     */

    public async register(name:string, email:string,password:string,role:string):Promise<string |Error>{
        try {
            const user = await this.user.create({
                name, email,password,role
            })
            const  accessToken =token.createToken(user)
            return accessToken
            
        } catch (error) {
            throw new Error("Unable to create user")
            
        }

    }

    /**Attempt to login the user */

    public async login(email:string,password:string):Promise<string|Error>{
        try {
            let user = await this.user.findOne({email})
            if(!user){
                throw new Error("Unable to find User with that email")
            }

            if(await user.isValidPassword(password)){
                return token.createToken(user)
            }else{
                throw new Error("Wrong credentials passed")
            }
        } catch (error) {
            throw new Error("Unavle to login User")
            
        }

    }
}

export default userService