import { validate, Joi } from "express-validation"

export const signupValidator = validate({
    body: Joi.object({
        name: Joi.string().required().messages({ "any.required": "Name is required" }),
        email: Joi.string().required().email().messages({ "any.required": "Email is required" }),
        password: Joi.string().required().min(8).messages({ "any.required": "Password is required" }),
    })
})