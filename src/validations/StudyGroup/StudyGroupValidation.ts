import { RequestHandler } from "express";
import validator from "../utils/validator";
import { StudyGroupSchem } from "./StudyGroupSchema";

export const AddStudyGroupValidation : RequestHandler = (req,res,next) => {
    validator(StudyGroupSchem.addStudyGroupPayload,req.body,next);
}

export const UpdateStudyGroupValidation : RequestHandler = (req,res,next) =>{
    validator(StudyGroupSchem.updateStudyGroupPayload,req.body,next);
}

