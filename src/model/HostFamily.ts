import { Schema,Document,model, ObjectId } from "mongoose";


interface IPersonalInfo{
    family_id: string,
    first_name: string,
    last_name: string,
    address: string,
    country: string,
    city: string,
    land_line: string,
    email: string,
    contact: string,
}

interface ISpecification{
    interests: string[],
    no_of_members: number,
    number_of_bed: number,
    is_pets_at_home: boolean,
    is_dogs_at_home: boolean,
    preference: string,
    notes: string,
    description: string,
}

interface IBankDetails{
    account_number: string,
    bank_name: string,
    sort_code: string,
    account_holder_name: string,
}

interface IHostFamily extends Document{
    personal_info : IPersonalInfo,
    specification : ISpecification,
    bank_details : IBankDetails,
    created_by : ObjectId
}

const personalInfoSchema : Schema = new Schema<IPersonalInfo>({
    family_id: String,
    first_name: String,
    last_name: String,
    address: String,
    country: String,
    city: String,
    land_line: String,
    email: String,
    contact: String,
});

const specificationSchema = new Schema<ISpecification>({
    interests: [String],
    no_of_members: Number,
    number_of_bed: Number,
    is_pets_at_home: Boolean,
    is_dogs_at_home: Boolean,
    preference: String,
    notes: String,
    description: String,
});

const bankDetailsSchema = new Schema<IBankDetails>({
    account_number: String,
    bank_name: String,
    sort_code: String,
    account_holder_name: String,
});


const HostFamilySchema:Schema = new Schema({
    personal_info : personalInfoSchema,
    specifications : specificationSchema,
    bank_details : bankDetailsSchema,
    created_by : Schema.Types.ObjectId
});

export default model<IHostFamily>("HostFamily",HostFamilySchema);
