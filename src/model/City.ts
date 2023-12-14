
import { ObjectId } from "mongodb";
import { Schema,Document,model } from "mongoose";


export interface ICity extends Document
{
    name : string,
    state_id : ObjectId,
    country_id : ObjectId
}

const CitySchema : Schema = new Schema({
        name : {
            type : String,
            default : null
        },
        state_id : {
            type : Schema.Types.ObjectId,
            default : null
        },
        country_id : {
            type : Schema.Types.ObjectId,
            default : null
        }

})

export default model<ICity>("City",CitySchema);