import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Branch from "../model/Branch";


export const FetchBranch: RequestHandler = async (req, res, next) => {
    try {
        let filter ={};
        let search = req.query.search;
        if(search)
        {
            filter = {$or:[{ 'branch_name': new RegExp( `${search}`,'i')},{ 'postal_code': new RegExp( `${search}`,'i')},{ 'contact_number': new RegExp( `${search}`,'i')},{ 'email': new RegExp( `${search}`,'i')},{ 'city': new RegExp( `${search}`,'i')}]};
        }

        const branches = await Branch.find(filter).sort({ _id: -1 });

        res.status(200).json({
            status: 'success',
            message: 'Branch fetched successfully',
            data: branches
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const AddBranch: RequestHandler = async (req, res, next) => {
    try { 
        let payload = req.body;
        
        const checkBranch=  await Branch.findOne({branch_name:payload.branch_name}).count();

        if(checkBranch > 0)
        {
            return next(createHttpError(422,"Branch already exists"));
        }
       
        const branch = await Branch.create(payload);

        res.status(201).json({
            status: 'success',
            message: 'Branch Added Successfully',
            data: branch
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const GetBranchById: RequestHandler = async (req, res, next) => {
    try {
        const branch = await Branch.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Branch fetched successfully',
            data: branch
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const UpdateBranch: RequestHandler = async (req, res, next) => {
    try {
        let payload = req.body;
        const checkBranch=  await Branch.findOne({branch_name:payload.branch_name});

        if(checkBranch?._id.toString() !== req.params.id.toString())
        {
            return next(createHttpError(422,"Branch name already exist"));
        }
        
        const branch = await Branch.findByIdAndUpdate(req.params.id, payload);

        res.status(204).json({
            status: 'success',
            message: 'Branch updated successfully',
        });
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const DeleteBranch: RequestHandler = async (req, res, next) => {
    try {
        const branch = await Branch.deleteOne({ _id: req.params.id });

        res.status(204).json(
            {
                status: 'success',
                message: 'Branch deleted successfully',
            }
        );
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}