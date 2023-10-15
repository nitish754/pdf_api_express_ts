import { RequestHandler } from "express";
import HostFamily from "../model/HostFamily";
import createHttpError, { CreateHttpError } from "http-errors";

export const HostFamilyList:RequestHandler = async (req,res,next) => {
    try
    {

    }catch(error)
    {
        return next(createHttpError.InternalServerError);
    }
}

export const AddHostFamily:RequestHandler = async(req,res,next) => {
    try{
        const addHost = await HostFamily.create(req.body);
        res.status(201).json({
            message : 'Host family added successfully',
            data : addHost
        });
    }catch(error){
        return next(createHttpError.InternalServerError);
    }
}