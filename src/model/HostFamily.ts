
import { Schema,Document,model, ObjectId } from "mongoose";


interface IPersonalInfo{
    family_id: string,
    full_name: string,
    postal_code: string,
    bed_type : string,
    no_of_bathroom : string,
    no_of_bedroom : string,
    no_of_student : string,
    no_of_bedroom_for_student : string,
    total_no_of_bed : string,
    interests : string,
    pets_at_home : string,
    preference: string,
    address: string,
    country: string,
    city: string,
    land_line: string,
    email: string,
    contact: string,
}

interface ISpecification{
    other_people_in_house : string,
    is_wifi : boolean,
    transport : string,
    allergies : string,
    is_smokers : boolean,
    is_accomodate_smoker : boolean,
    bus_route : string,
    access_to_tv : boolean,
    accomodate_food_intolerance : boolean,
    spare_time_activities : string,
    preffered_communication_method : string,
    visit_report: string,
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
    specifications : ISpecification,
    bank_details : IBankDetails,
    created_by : ObjectId
}

const personalInfoSchema : Schema = new Schema<IPersonalInfo>({
    family_id: String,
    full_name: String,
    postal_code:String,
    bed_type : String,
    no_of_bathroom : String,
    no_of_bedroom : String,
    no_of_bedroom_for_student : String,
    no_of_student : String,
    total_no_of_bed: String,
    interests: String,
    pets_at_home : String,
    preference : String,
    address: String,
    country: String,
    city: String,
    land_line: String,
    email: String,
    contact: String,
},{
    _id : false,
    id : false
});

const specificationSchema = new Schema<ISpecification>({
    other_people_in_house: String,
    is_wifi: Boolean,
    transport: String,
    allergies: String,
    is_smokers: Boolean,
    is_accomodate_smoker: Boolean,
    bus_route: String,
    access_to_tv: Boolean,
    accomodate_food_intolerance: Boolean,
    spare_time_activities: String,
    preffered_communication_method: String,
    visit_report: String,
    description: String,
},{
    _id : false,
    id : false
});

const bankDetailsSchema = new Schema<IBankDetails>({
    account_number: String,
    bank_name: String,
    sort_code: String,
    account_holder_name: String,
},{
    _id : false,
    id : false
});


const HostFamilySchema:Schema = new Schema({
    personal_info : personalInfoSchema,
    specifications : specificationSchema,
    bank_details : bankDetailsSchema,
    created_by : Schema.Types.ObjectId,

},{ timestamps: true });


export default model<IHostFamily>("HostFamily",HostFamilySchema);
