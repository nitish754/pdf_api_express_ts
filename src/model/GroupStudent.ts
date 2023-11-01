import { Schema,Document,model, ObjectId } from "mongoose";

export interface IGroupStudent extends Document{
    student_id : string,
    first_name : string,
    last_name :string,
    nationality : string,
    gender : string,
    dob : Date,
    special_needs : string,
    allergy : string,
    document_type : string,
    document_number : string,
    date_of_expiry : Date,
    country_of_issue : string,
    allergy_to :string,
    email : string,
    contact_number : string,
    study_group_id:ObjectId,
    host_family_id : ObjectId
}

const GroupStudentSchema:Schema = new Schema({
    student_id: String,
    first_name: String,
    last_name: String,
    nationality: String,
    gender: String,
    dob : Date,
    document_type: String,
    special_needs: String,
    allergy: String,
    document_number: String,
    date_of_expiry: Date,
    country_of_issue: String,
    allergy_to: String,
    email: {
        type: String,
        default : null
    },
    contact_number: String,
    study_group_id: {
        type: Schema.Types.ObjectId,
        default : null
    },
    host_family_id : {
        type : Schema.Types.ObjectId,
        ref : 'HostFamily',
        default : null
    }
})

export default model<IGroupStudent>("GroupStudent",GroupStudentSchema);