import { RequestHandler } from "express";
import createHttpError from "http-errors";
import StudyGroup from "../model/StudyGroup";


export const StudyGroupList: RequestHandler = async (req, res, next) => {

}

export const AddStudyGroup: RequestHandler = async (req, res, next) => {
    try {
        const validateGroupId = await StudyGroup.findOne({group_id: req.body.group_id}).count();
        const validateGroupName = await StudyGroup.findOne({group_name: req.body.group_name}).count();
        if(validateGroupId > 0)
        {
            return next(createHttpError(422,'Group Id is alredy taken'))
        }
        if(validateGroupName > 0)
        {
            return next(createHttpError(422,'Group Name already taken'))
        }
        const add = await StudyGroup.create(req.body);

        res.status(201).json({
            'status': 'success',
            'message': 'data added successfully',
            'data': add
        })
    }
    catch (error) {
        return next(createHttpError.InternalServerError);
    }

}

export const StudyGroupById: RequestHandler = async (req, res, next) => {
    try{
        const data = await StudyGroup.findById(req.params.id);

        res.status(200).json({
            'status' : 'success',
            'message' : 'data reterived successfully',
            'data' : data
        })
    }catch(error)
    {
        return next(createHttpError.InternalServerError);
    }
}

export const UpdateStudyGroup: RequestHandler = async (req, res, next) => {

}

export const DeleteStudyGroup: RequestHandler = async (req, res, next) => {

}


export const GenerateIdCardForGroup: RequestHandler = async (req, res, next) => {

}

export const GenerateLetterForGroup: RequestHandler = async (req, res, next) => {

}