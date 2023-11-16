import Joi from "joi";

export const GroupStudentSchema = {
    addGroupStudent: Joi.object().keys({
        profile_type : Joi.string().required().label('Profile Type'),
        first_name: Joi.string().required().label('First Name'),
        last_name: Joi.string().required().label('Last Name'),
        gender: Joi.string().required().label('Gender'),
        nationality: Joi.string().label('Nationality'),
        document_type: Joi.string().label('Document Type'),
        special_needs: Joi.string().label('Special Needs'),
        dob: Joi.date().iso().label('Date of Birth'),
        allergy: Joi.string().label('Allergy'),
        document_number: Joi.string().label('Document Number'),
        date_of_expiry: Joi.date().iso().label('Date of Expiry'),
        country_of_issue: Joi.string().label('Country of Issue'),
        allergy_to: Joi.string().label('Allergies'),
        email: Joi.string().email().label('Email'),
        contact_number: Joi.string().label('Contact Number')
        // study_group_id: Joi.string().required().label('Group id')
    }),
    updateGroupStudent: Joi.object().keys({
        profile_type : Joi.string().required().label('Profile Type'),
        first_name: Joi.string().required().label('First Name'),
        last_name: Joi.string().required().label('Last Name'),
        gender: Joi.string().required().label('Gender'),
        nationality: Joi.string().label('Nationality'),
        document_type: Joi.string().label('Document Type'),
        special_needs: Joi.string().label('Special Needs'),
        dob: Joi.date().iso().label('Date of Birth'),
        allergy: Joi.string().label('Allergy'),
        document_number: Joi.string().label('Document Number'),
        date_of_expiry: Joi.date().iso().label('Date of Expiry'),
        country_of_issue: Joi.string().label('Country of Issue'),
        allergy_to: Joi.string().label('Allergies'),
        email: Joi.string().email().label('Email'),
        contact_number: Joi.string().label('Contact Number')
    }),
    AssignHostFamily : Joi.object().keys({
        host_family_id : Joi.string().required().label('Host Family Id')
    })
}