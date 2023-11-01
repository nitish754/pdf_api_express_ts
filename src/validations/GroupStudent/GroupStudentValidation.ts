import { RequestHandler } from "express";
import validator from "../utils/validator";
import { GroupStudentSchema } from "./GroupStudentSchema";

export const AddGroupStudentPayload : RequestHandler = (req,res,next) =>{
    validator(GroupStudentSchema.addGroupStudent,req.body,next);
}

export const UpdateGroupStudentPayload : RequestHandler = (req,res,next)=>{
    validator(GroupStudentSchema.updateGroupStudent,req.body,next)
}

export const AssignHostFamilyPayload : RequestHandler = (req,res,next) => {
    validator(GroupStudentSchema.AssignHostFamily,req.body,next);
}