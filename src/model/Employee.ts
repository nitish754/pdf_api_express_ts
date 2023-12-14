import { Schema, Document, model } from "mongoose";

interface IEmployee extends Document {
    user_id: string,
    full_name: string,
    role: string,
    position: string,
    mobile_no: string,
    email: string,
    password: string

}

const EmployeeSchema: Schema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model<IEmployee>("Employee", EmployeeSchema)