import Joi from "joi";

export const HostFamilySchema = Joi.object().keys({
    personal_info: Joi.object().keys({
        full_name: Joi.string().required().label('Full name'),
        postal_code: Joi.string().required().label('Postal Code'),
        bed_type: Joi.string().allow('').label('Bed Type'),
        no_of_bathroom: Joi.string().allow('').label('Number of Bathrooms'),
        no_of_bedroom: Joi.string().allow('').label('Number of Bedrooms'),
        // no_of_student: Joi.string().allow(''),
        no_of_bedroom_for_student: Joi.string().allow('').label('Number of Bedrooms for Students'),
        total_no_of_bed: Joi.string().allow('').label('Total Number of Beds'),
        interests: Joi.string().allow('').label('Interests'),
        pets_at_home: Joi.string().allow('').label('Pets at Home'),
        preference: Joi.string().allow('').label('Preference'),
        address: Joi.string().required().label('Address'),
        country: Joi.string().required().label('Country'),
        city: Joi.string().required().label('City'),
        land_line: Joi.string().allow('').label('Land Line'),
        email: Joi.string().email().required().label('Email'),
        contact: Joi.string().required().label('Contact'),
    }),
    specifications: Joi.object({
        other_people_in_house: Joi.string().allow('').label('Other People in House'),
        is_wifi: Joi.boolean().allow('').label('Is WiFi'),
        transport: Joi.string().allow('').label('Transport'),
        allergies: Joi.string().allow('').label('Allergies'),
        is_smokers: Joi.boolean().allow('').label('Is Smokers'),
        is_accomodate_smoker: Joi.boolean().allow('').label('Accommodate Smoker'),
        bus_route: Joi.string().allow('').label('Bus Route'),
        access_to_tv: Joi.boolean().allow('').label('Access to TV'),
        accomodate_food_intolerance: Joi.boolean().allow('').label('Accommodate Food Intolerance'),
        spare_time_activities: Joi.string().allow('').label('Spare Time Activities'),
        preffered_communication_method: Joi.string().allow('').label('Preferred Communication Method'),
        visit_report: Joi.string().allow('').label('Visit Report'),
        description: Joi.string().allow('').label('Description'),
    }),
    bank_details: Joi.object({
        account_number: Joi.string().allow('').label('Account Number'),
        bank_name: Joi.string().allow('').label('Bank Name'),
        sort_code: Joi.string().allow('').label('Sort Code'),
        account_holder_name: Joi.string().allow('').label('Account Holder Name'),
    })
})