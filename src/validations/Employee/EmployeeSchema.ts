import { RequestHandler } from "express";
import Joi from "joi";

export const EmployeeSchema = {
    AddEmployeePayload: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string(),
        gender: Joi.string(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        dob: Joi.date(),
        position: Joi.string(),
        nationality: Joi.string(),
        password: Joi.string(),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({ 'any.only': 'Passwords do not match' })
    }),
    UpdateEmployee: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string(),
        gender: Joi.string(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        dob: Joi.date(),
        position: Joi.string(),
        nationality: Joi.string(),
        password: Joi.string(),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({ 'any.only': 'Passwords do not match' })
    })
} 