import Joi from "joi";

export const GroupStudentSchema = {
    addGroupStudent: Joi.object().keys({
        profile_type: Joi.string().required().label('Profile Type'),
        first_name: Joi.string().required().label('First Name'),
        last_name: Joi.string().required().label('Last Name'),
        gender: Joi.string().required().label('Gender'),
        nationality: Joi.string().allow('').label('Nationality'),
        document_type: Joi.string().allow('').label('Document Type'),
        special_needs: Joi.string().allow('').label('Special Needs'),
        dob: Joi.date().iso().allow('').label('Date of Birth'),
        allergy: Joi.string().allow('').label('Allergy'),
        document_number: Joi.string().allow('').label('Document Number'),
        date_of_expiry: Joi.date().iso().allow('').label('Date of Expiry'),
        country_of_issue: Joi.string().allow('').label('Country of Issue'),
        allergy_to: Joi.string().allow('').label('Allergies'),
        email: Joi.string().email().allow('').label('Email'),
        contact_number: Joi.string().allow('').label('Contact Number')
    }),
    updateGroupStudent: Joi.object().keys({
        profile_type: Joi.string().required().label('Profile Type'),
        first_name: Joi.string().required().label('First Name'),
        last_name: Joi.string().required().label('Last Name'),
        gender: Joi.string().required().label('Gender'),
        nationality: Joi.string().allow('').label('Nationality'),
        document_type: Joi.string().allow('').label('Document Type'),
        special_needs: Joi.string().allow('').label('Special Needs'),
        dob: Joi.date().iso().allow('').label('Date of Birth'),
        allergy: Joi.string().allow('').label('Allergy'),
        document_number: Joi.string().allow('').label('Document Number'),
        date_of_expiry: Joi.date().iso().allow('').label('Date of Expiry'),
        country_of_issue: Joi.string().allow('').label('Country of Issue'),
        allergy_to: Joi.string().allow('').label('Allergies'),
        email: Joi.string().email().allow('').label('Email'),
        contact_number: Joi.string().allow('').label('Contact Number')
    }),
    AssignHostFamily: Joi.object().keys({
        host_family_id: Joi.string().required().label('Host Family Id')
    })
}