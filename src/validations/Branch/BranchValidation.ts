import { RequestHandler } from "express";
import validator from "../utils/validator";
import { BranchSchema } from "./BranchSchema";

export const AddBranchPayload:RequestHandler = (req,res,next) =>{
    validator(BranchSchema.addBranch,req.body,next);
}

export const UpdateBranchPayload:RequestHandler = (req,res,next)=>{
    validator(BranchSchema.updateBranch,req.body,next)
}