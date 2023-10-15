import { RequestHandler } from "express";
import HostFamily from "../model/HostFamily";
import createHttpError, { CreateHttpError } from "http-errors";
import  ObjectId from "mongodb";

export const HostFamilyList:RequestHandler = async (req,res,next) => {
    try
    {
        let {city,search} = req.query;
        let filterField = {};

        if(city)
        {
            filterField = {'personal_info.city':city}
        }
        if(search)
        {
            filterField = {'personal_info.name':search,'personal_info.email':search,'personal_info.contact':search}
        }

        let hosFamily = await HostFamily.find(filterField).sort({'created_at':-1});

        res.status(200).json({
            message : 'Data reterived successfully',
            data : hosFamily
        })
        
    }catch(error)
    {
        return next(createHttpError.InternalServerError);
    }
}

export const AddHostFamily:RequestHandler = async(req,res,next) => {
    try{
        const ValidateEmail = await HostFamily.findOne({'personal_info.email':req.body.personal_info.email})
        if(ValidateEmail)
        {
            return next(createHttpError(422,"Email already registered with us"))
        }
        const addHost = await HostFamily.create(req.body);
        res.status(201).json({
            message : 'Host family added successfully',
            data : addHost
        });
    }catch(error){
        return next(createHttpError.InternalServerError);
    }
}

export const findFamilyById: RequestHandler = async(req,res,next) => {
    try{
        const hostFamily = await HostFamily.findById(req.params.id);

        res.status(200).json({
            message : 'Data reterived successfully',
            data : hostFamily
        })
    }catch(error)
    {
        return next(createHttpError.InternalServerError);
    }
}

export const UpdateFamily:RequestHandler = async(req,res,next) => {
    try{
        const ValidateEmail = await HostFamily.findOne({'personal_info.email':req.body.personal_info.email});

        if(req.params.id !== ValidateEmail?._id.toString())
        {
            return next(createHttpError(422,"Email already exist"));
        }

        const UpdateFamily = await HostFamily.findByIdAndUpdate(req.params.id,req.body);

        res.status(200).json({
            message : 'Family updated successfully',
        })
    }catch(error){
        return next(createHttpError.InternalServerError);
    }
}