import { RequestHandler } from "express";
import validator from "../utils/validator";
import { HostFamilySchema } from "./HostFamilySchema";

export const AddHostFamilyValidation:RequestHandler = (req,res,next) => {
    validator(HostFamilySchema,req.body,next);
}