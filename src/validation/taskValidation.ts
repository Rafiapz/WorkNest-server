import Joi from "joi";

export const taskValidation = Joi.object({

    title: Joi
        .string()
        .min(3)
        .required(),

    description: Joi
        .string()
        .min(6)
        .required(),

    assignedTo: Joi
        .array()
        .min(1)
        .required(),
    userId: Joi
        .required(),

    start: Joi
        .required(),

    end: Joi
        .required(),

    date: Joi
        .required()

})