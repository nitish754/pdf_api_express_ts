import Joi from "joi";

export const BranchSchema = {
    addBranch: Joi.object().keys({
        branch_name: Joi.string().required().label('Branch Name'),
        contact_number: Joi.string().required().label('Contact Number'), // Assuming contact number is a 10-digit number
        email: Joi.string().required().email().label('Email'),

        city: Joi.string().allow('').label('City'),
        town: Joi.string().allow('').label('Town'),
        address: Joi.string().allow('').label('Address'),
        postal_code: Joi.string().allow('').label('Postal Code'),
        country: Joi.string().allow('').label('Country'),
        land_line: Joi.string().allow('').label('Landline'),
    }),
    updateBranch: Joi.object().keys({
        branch_name: Joi.string().required().label('Branch Name'),
        contact_number: Joi.string().required().label('Contact Number'), // Assuming contact number is a 10-digit number
        email: Joi.string().required().email().label('Email'),

        city: Joi.string().allow('').label('City'),
        town: Joi.string().allow('').label('Town'),
        address: Joi.string().allow('').label('Address'),
        postal_code: Joi.string().allow('').label('Postal Code'),
        country: Joi.string().allow('').label('Country'),
        land_line: Joi.string().allow('').label('Landline'),
    })
}