import Joi from "joi";

export const GroupStudentSchema = {
    addGroupStudent: Joi.object().keys({
        student_id: Joi.string().required().label('Student ID'),
        first_name: Joi.string().required().label('First Name'),
        last_name: Joi.string().required().label('Last Name'),
        nationality: Joi.string().required().label('Nationality'),
        gender: Joi.string().required().label('Gender'),
        type: Joi.string().required().label('Type'),
        special_needs: Joi.string().required().label('Special Needs'),
        allergy: Joi.string().required().label('Allergy'),
        document_number: Joi.string().required().label('Document Number'),
        date_of_expiry: Joi.date().iso().required().label('Date of Expiry'),
        country_of_issue: Joi.date().iso().required().label('Country of Issue'),
        allergy_to: Joi.array().items(Joi.string()).required().label('Allergies'),
        email: Joi.string().email().required().label('Email'),
        contact_number: Joi.string().required().label('Contact Number'),
    }),
    updateGroupStudent: Joi.object().keys({

    })
}