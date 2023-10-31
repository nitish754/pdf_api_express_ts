import Joi from "joi";

export const HostFamilySchema = Joi.object().keys({
    personal_info: Joi.object().keys({
        full_name: Joi.string().required(),
        postal_code: Joi.string().required(),
        bed_type: Joi.string(),
        no_of_bathroom: Joi.string(),
        no_of_bedroom: Joi.string().required(),
        no_of_student: Joi.string(),
        no_of_bedroom_for_student: Joi.string(),
        total_no_of_bed: Joi.string(),
        interests: Joi.string(),
        pets_at_home: Joi.string(),
        preference: Joi.string(),
        address: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        land_line: Joi.string(),
        email: Joi.string().email().required(),
        contact: Joi.string().required(),
    }),
    specifications: Joi.object({
        other_people_in_house: Joi.string().label('Other People in House'),
        is_wifi: Joi.boolean().label('Is WiFi'),
        transport: Joi.string().label('Transport'),
        allergies: Joi.string().label('Allergies'),
        is_smokers: Joi.boolean().label('Is Smokers'),
        is_accomodate_smoker: Joi.boolean().label('Accommodate Smoker'),
        bus_route: Joi.string().label('Bus Route'),
        access_to_tv: Joi.boolean().label('Access to TV'),
        accomodate_food_intolerance: Joi.boolean().label('Accommodate Food Intolerance'),
        spare_time_activities: Joi.string().label('Spare Time Activities'),
        preffered_communication_method: Joi.string().label('Preferred Communication Method'),
        visit_report: Joi.string().label('Visit Report'),
        description: Joi.string().label('Description'),
    }),
    bank_details: Joi.object({
        account_number: Joi.string().label('Account Number'),
        bank_name: Joi.string().label('Bank Name'),
        sort_code: Joi.string().label('Sort Code'),
        account_holder_name: Joi.string().label('Account Holder Name'),
    })
})