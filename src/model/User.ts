import {Schema,Document,model} from 'mongoose'

export interface IUser extends Document{
    name : string,
    first_name : string,
    last_name : string,
    gender : string,
    email : string,
    mobile : string,
    dob : Date,
    position : string,
    nationality : string,
    program_name : string, 
    password : string,
    verifyToken : string,
    isUserVerified : boolean
}

const UserSchema:Schema = new Schema({
    name : {
        type :String,
        default : null
    },
    first_name : {
        type :String,
        default : null
    },
    last_name : {
        type :String,
        default : null
    },
    gender : {
        type: String,
        default: null
    },

    email :{
        type : String,
        unique : true
    },
    mobile : {
        type  : String,
        default : null
    },
    dob : {
        type : Date,
        default : null
    },
    position : {
        type : String,
        default : null
    },
    nationality : {
        type : String,
        default : null
    },
    program_name : {
        type : String,
        default : null
    },
    password : {
        type : String,
        default : null
    },
    verifyToken : {
        type : String,
        default : null
    },
    isUserVerified : {
        type : Boolean,
        default : false
    }
})

export default model<IUser>("User",UserSchema)