import { RequestHandler } from "express";
import Joi from "joi";

export const EmployeeSchema = {
    AddEmployeePayload: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().allow('').label('Last Name'),
        gender: Joi.string().allow('').label('Gender'),
        email: Joi.string().email().required().label('Email'),
        mobile: Joi.string().allow('').label('Mobile'),
        dob: Joi.date().allow('').label('DOB'),
        position: Joi.string().allow('').label('Position'),
        nationality: Joi.string().allow('').label('Nationality'),
        password: Joi.string().allow('').label('Password'),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({ 'any.only': 'Passwords do not match' })
    }),
    UpdateEmployee: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().allow('').label('Last Name'),
        gender: Joi.string().allow('').label('Gender'),
        email: Joi.string().email().required().label('Email'),
        mobile: Joi.string().required().label('Mobile'),
        dob: Joi.date().allow('').label('DOB'),
        position: Joi.string().allow('').label('Position'),
        nationality: Joi.string().allow('').label('Nationality'),
        password: Joi.string().allow('').label('Password'),
        confirm_password: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({ 'any.only': 'Passwords do not match' })
    })
} 