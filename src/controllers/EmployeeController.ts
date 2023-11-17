import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Employee from "../model/Employee";
import User from "../model/User";
import bcrypt from "bcrypt";


export const FetchEmployee:RequestHandler =async (req,res,next) => {
    try {
        let filter ={};
        let search = req.query.search;
        if(search)
        {
            filter = {$or:[{full_name:new RegExp(`${search}`,'i')},{role:new RegExp(`${search}`,'i')},{email:new RegExp(`${search}`,'i')},{mobile_no:new RegExp(`${search}`,'i')}]}
        }
        const emp = await User.find(filter).sort({_id:-1});

        res.json({
            status : 'success',
            message : 'Employee reterived successfully',
            data : emp
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const AddEmployee : RequestHandler = async (req,res,next) =>{
    try {
        let payload = req.body;
        payload.created_by = req.user?._id;
        payload.password = bcrypt.hash(payload.password,8)
        // res.json(payload);
        const user = await User.findOne({email : payload.email});
        if(user)
        {
            return next(createHttpError(422,'User Already registered'));
        }
        

        const employee = await User.create(payload);
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const FetchEmployeeById : RequestHandler = async (req,res,next) =>{
        try {
            const user = await User.findById(req.params.id);

            res.json({
                status : 'success',
                message : 'Data reterived successfully',
                data : user
            })
        } catch (error) {
            return next(createHttpError.InternalServerError);
        }
}

export const UpdateEmployee : RequestHandler = async (req,res,next) =>{

}

export const DeleteEmployee : RequestHandler = async (req,res,next) =>{

}