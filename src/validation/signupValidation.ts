import Joi from "joi";

export const signupValidation = Joi.object({

    fullName: Joi
        .string()
        .required(),

    email: Joi
        .string()
        .email()
        .required(),

    password: Joi
        .string()
        .required(),
    role: Joi
        .string()
        .required(),
    managerId: Joi
        .string()

})