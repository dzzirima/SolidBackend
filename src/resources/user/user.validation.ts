import Joi from "joi";

/// validation of user input
const register = Joi.object({
    name:Joi.string().required().max(30),
    email:Joi.string().email().required(),
    password:Joi.string().min(4).required
})

const login = Joi.object({
    email:Joi.string().required,
    password:Joi.string().required()
})


export default {register,login}