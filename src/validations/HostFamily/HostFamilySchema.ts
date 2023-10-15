import Joi from "joi";

export const HostFamilySchema = Joi.object({
    personal_info: Joi.object({
        family_id: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        address: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        land_line: Joi.string().required(),
        email: Joi.string().email().required(),
        contact: Joi.string().required(),
    }),
    specifications: Joi.object({
        interests: Joi.array().items(Joi.string()),
        no_of_members: Joi.number().integer().positive(),
        number_of_bed: Joi.number().integer().positive(),
        is_pets_at_home: Joi.boolean(),
        is_dogs_at_home: Joi.boolean(),
        preference: Joi.string(),
        notes: Joi.string(),
        description: Joi.string(),
    }),
    bank_details: Joi.object({
        account_number: Joi.string().required(),
        bank_name: Joi.string().required(),
        sort_code: Joi.string().required(),
        account_holder_name: Joi.string().required(),
    })
})