import { RequestHandler } from "express";
import validator from "../utils/validator";
import { EmployeeSchema } from "./EmployeeSchema";

export const AddEmployeePayload : RequestHandler = (req,res,next) => {
    validator(EmployeeSchema.AddEmployeePayload,req.body,next)
}

export const UpdateEmployeePayload: RequestHandler = (req,res,next) =>{
    validator(EmployeeSchema.UpdateEmployee,req.body,next);
}