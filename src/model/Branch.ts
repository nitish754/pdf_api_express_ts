import { Schema,Document,model } from "mongoose";

export interface IBranch extends Document{
    branch_name : string,
    city : string,
    town : string,
    address : string,
    postal_code : string,
    country : string,
    contact_number : string,
    email : string,
    land_line : string
}

const BranchSchema : Schema = new Schema({
    branch_name : {
        type : String,
        default : null
    },
    city : {
        type : String,
        default : null
    },
    town : {
        type : String,
        default : null
    },
    address : {
        type : String,
        default : null
    },
    postal_code : {
        type :String,
        default : null
    },
    country : {
        type : String,
        default : null
    },
    contact_number : {
        type : String,
        default : null
    },
    email : {
        type : String,
        default : null
    },
    land_line: {
        type : String,
        default : null
    }
})

export default model<IBranch>("Branch",BranchSchema);