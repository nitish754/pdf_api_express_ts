import Joi from "joi";

export const UserSchema = {
    signupPayload: Joi.object({
        first_name: Joi.string().required().label('First name'),
        last_name: Joi.string().allow('').label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required()
    }),
    loginPayload: Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    }),
    updateProfilePayload: Joi.object().keys({
        first_name: Joi.string().label('First Name'),
        last_name: Joi.string().allow('').label('Last Name'),
        gender: Joi.string().allow('').label('Gender'),
        email: Joi.string().email().label('Email'),
        mobile: Joi.string().allow('').label('Mobile'),
        dob: Joi.date().iso().allow('').label('Date of Birth'),
        position: Joi.string().allow('').label('Position'),
        nationality: Joi.string().allow('').label('Nationality'),
        password: Joi.string().allow('').label('Password'),
        old_password: Joi.string().allow('').label('Old Password')
    })
}