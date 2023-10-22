import { Schema, Document, model } from "mongoose";

export interface IStudyGroup extends Document {
    group_id: string,
    group_name: string,
    contact_number: string,
    country_origin: string,
    teacher_responsible: string,
    email: string,
    nationality: string,
    program_name: string,
    arrival_date: Date,
    departure_date: Date
    created_by: Date
}

const StudyGroupSchema: Schema = new Schema({
    group_id: { type: String, default: null },
    group_name: { type: String, default: null },
    contact_number: { type: String, default: null },
    country_origin: { type: String, default: null },
    teacher_responsible: { type: String, default: null },
    email: { type: String, default: null },
    nationality: { type: String, default: null },
    program_name: { type: String, default: null },
    arrival_date: { type: Date, default: null },
    departure_date: { type: Date, default: null },
    created_by: { type: Date, default: null },
},{
    timestamps:true,
})

export default model<IStudyGroup>("StudyGroup",StudyGroupSchema);