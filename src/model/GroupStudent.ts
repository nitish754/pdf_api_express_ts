import { Schema,Document,model, ObjectId } from "mongoose";

export interface IGroupStudent extends Document{
    student_id : string,
    first_name : string,
    last_name :string,
    nationality : string,
    gender : string,
    type :string,
    special_needs : string,
    allergy : string,
    document_number : string,
    date_of_expiry : Date,
    country_of_issue : Date,
    allergy_to :string[],
    email : string,
    contact_number : string,
    study_group_id:ObjectId
}

const GroupStudentSchema:Schema = new Schema({
    student_id: String,
    first_name: String,
    last_name: String,
    nationality: String,
    gender: String,
    type: String,
    special_needs: String,
    allergy: String,
    document_number: String,
    date_of_expiry: Date,
    country_of_issue: Date,
    allergy_to: [String],
    email: {
        type: String,
        unique: true
    },
    contact_number: String,
    study_group_id: {
        type: Schema.Types.ObjectId,
        ref: 'StudyGroup',
        default : null
    }
})

export default model<IGroupStudent>("GroupStudent",GroupStudentSchema);