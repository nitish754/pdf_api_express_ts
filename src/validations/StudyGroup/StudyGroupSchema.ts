import Joi from "joi";


export const StudyGroupSchem = {
    addStudyGroupPayload: Joi.object().keys({
        group_name: Joi.string().required().label('Group Name'),
        tour_guide_contact: Joi.string().required().label('Tour Guide Mobile'),
        teacher_contact_number: Joi.string().allow('').label('Teacher Mobile'),
        country_origin: Joi.string().allow('').label('Country of Origin'),
        teacher_responsible: Joi.string().allow('').label('Teacher Responsible'),
        tour_guide_email: Joi.string().required().email().label('Tour Guide Email'),
        teacher_email: Joi.string().email().allow('').label('Teacher Email'),
        program_name: Joi.string().required().label('Program Name'),
        arrival_date: Joi.date().iso().required().label('Arrival Date'),
        departure_date: Joi.date().iso().required().label('Departure Date'),
        school_visiting: Joi.string().required().label('School Visiting'),
        tour_guide: Joi.string().required().label('Tour Guide'),
    }),
    updateStudyGroupPayload: Joi.object().keys({
        group_name: Joi.string().required().label('Group Name'),
        tour_guide_contact: Joi.string().required().label('Tour Guide Mobile'),
        teacher_contact_number: Joi.string().allow('').label('Teacher Mobile'),
        country_origin: Joi.string().allow('').label('Country of Origin'),
        teacher_responsible: Joi.string().allow('').label('Teacher Responsible'),
        tour_guide_email: Joi.string().required().email().label('Tour Guide Email'),
        teacher_email: Joi.string().email().allow('').label('Teacher Email'),
        program_name: Joi.string().required().label('Program Name'),
        arrival_date: Joi.date().iso().required().label('Arrival Date'),
        departure_date: Joi.date().iso().required().label('Departure Date'),
        school_visiting: Joi.string().required().label('School Visiting'),
        tour_guide: Joi.string().required().label('Tour Guide'),
    })
}