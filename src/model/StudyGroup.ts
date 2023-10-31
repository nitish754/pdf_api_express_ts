import { Schema, Document, model, Types } from "mongoose";

export interface IStudyGroup extends Document {
    group_id: string,
    group_name: string,
    teacher_contact_number: string,
    country_origin: string,
    teacher_responsible: string,
    teacher_email: string,
    tour_guide_email : string,
    tour_guide_contact : string,
    program_name: string,
    arrival_date: Date,
    departure_date: Date,
    school_visiting :string,
    tour_guide : String,
    created_by: Schema.Types.ObjectId
}

const StudyGroupSchema: Schema = new Schema({
    group_id: { type: String, default: null },
    group_name: { type: String, default: null },
    teacher_contact_number: { type: String, default: null },
    tour_guide_contact: { type: String, default: null },
    country_origin: { type: String, default: null },
    teacher_responsible: { type: String, default: null },
    teacher_email: { type: String, default: null },
    tour_guide_email : {type : String, default : null},
    program_name: { type: String, default: null },
    arrival_date: { type: Date, default: null },
    departure_date: { type: Date, default: null },
    school_visiting : {type : String, default : null},
    tour_guide : {type : String, default: null},
    created_by: { type: Types.ObjectId, default: null },
},{
    timestamps:true,
})




export default model<IStudyGroup>("StudyGroup",StudyGroupSchema);