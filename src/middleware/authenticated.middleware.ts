import userModel from "@/resources/user/user.model";
import HttpException from "@/utils/exceptions/http.exception";
import Token from "@/utils/interfaces/token.interface";
import { verifyToken } from "@/utils/token";
import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

async function authenticatedMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bear = req.headers.authorization;
  if (!bear || !bear.startsWith("Bearer ")) {
    return next(new HttpException(401,"Unauthorised"))
}

  const accessToken = bear.split("Bear: ")[1].trim();

  try {
    const payload: Token | Jwt.JsonWebTokenError = await verifyToken(
      accessToken
    );


    if (payload instanceof Jwt.JsonWebTokenError) {
        return next(new HttpException(401,"Unauthorised"))
    }

    // select other things except the password

    const user = await userModel.findById(payload.id)
        .select("-password")
        .exec()

    if(!user){
        return next(new HttpException(401,"Unauthorised"))
    }

    req.user = user

    return next()
  } catch (error) {
    return next(new HttpException(401,"Unauthorised"))
  }
}

export default authenticatedMiddleWare
