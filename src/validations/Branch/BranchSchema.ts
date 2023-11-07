import Joi from "joi";

export const BranchSchema = {
    addBranch: Joi.object().keys({
        branch_name: Joi.string().required().label('Branch Name'),
        city: Joi.string().required().label('City'),
        town: Joi.string().required().label('Town'),
        address: Joi.string().required().label('Address'),
        postal_code: Joi.string().required().label('Postal Code'),
        country: Joi.string().required().label('Country'),
        contact_number: Joi.string().required().label('Contact Number'), // Assuming contact number is a 10-digit number
        email: Joi.string().required().email().label('Email'),
        land_line: Joi.string().label('Landline'),
    }),
    updateBranch: Joi.object().keys({
        branch_name: Joi.string().required().label('Branch Name'),
        city: Joi.string().required().label('City'),
        town: Joi.string().required().label('Town'),
        address: Joi.string().required().label('Address'),
        postal_code: Joi.string().required().label('Postal Code'),
        country: Joi.string().required().label('Country'),
        contact_number: Joi.string().required().label('Contact Number'), // Assuming contact number is a 10-digit number
        email: Joi.string().required().email().label('Email'),
        land_line: Joi.string().label('Landline'),
    })
}