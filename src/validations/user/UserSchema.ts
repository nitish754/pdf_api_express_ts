import Joi from "joi";

export const UserSchema = {
    signupPayload: Joi.object({
        first_name: Joi.string().required().label('First name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
    }),
    loginPayload: Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    }),
    updateProfilePayload: Joi.object().keys({
        first_name: Joi.string().label('First Name'),
        last_name: Joi.string().label('Last Name'),
        gender: Joi.string().valid('male', 'female', 'other').label('Gender'),
        email: Joi.string().email().label('Email'),
        mobile: Joi.string().pattern(new RegExp('^[0-9]{10}$')).label('Mobile'),
        dob: Joi.date().iso().max('now').label('Date of Birth'),
        position: Joi.string().label('Position'),
        nationality: Joi.string().label('Nationality'),
        password: Joi.string().label('Password'),
        old_password: Joi.string().label('Old Password')
    })
}