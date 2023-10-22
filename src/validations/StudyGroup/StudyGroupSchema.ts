import Joi from "joi";


export const StudyGroupSchem = {
    addStudyGroupPayload: Joi.object().keys({
        group_id: Joi.string().required().label('Group ID'),
        group_name: Joi.string().required().label('Group Name'),
        contact_number: Joi.string().required().label('Contact Number'),
        country_origin: Joi.string().required().label('Country of Origin'),
        teacher_responsible: Joi.string().required().label('Teacher Responsible'),
        email: Joi.string().email().required().label('Email'),
        nationality: Joi.string().required().label('Nationality'),
        program_name: Joi.string().required().label('Program Name'),
        arrival_date: Joi.date().iso().required().label('Arrival Date'),
        departure_date: Joi.date().iso().required().label('Departure Date'),
    }),
    updateStudyGroupPayload: Joi.object().keys({
        group_id: Joi.string().required().label('Group ID'),
        group_name: Joi.string().required().label('Group Name'),
        contact_number: Joi.string().required().label('Contact Number'),
        country_origin: Joi.string().required().label('Country of Origin'),
        teacher_responsible: Joi.string().required().label('Teacher Responsible'),
        email: Joi.string().email().required().label('Email'),
        nationality: Joi.string().required().label('Nationality'),
        program_name: Joi.string().required().label('Program Name'),
        arrival_date: Joi.date().iso().required().label('Arrival Date'),
        departure_date: Joi.date().iso().required().label('Departure Date'),
    })
}