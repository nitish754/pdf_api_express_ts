import { RequestHandler } from "express";
import createHttpError from "http-errors";
import GroupStudent from "../model/GroupStudent";

export const AddStudentToGroup: RequestHandler = async (req, res, next) => {
    try {
        const validateEmail = await GroupStudent.findOne({ email: req.body.email, study_group_id: req.params.id }).count();
        if (validateEmail > 0) {
            return next(createHttpError(422, "Email is already exist in this group"));
        }
        const payload = req.body;
        payload.study_group_id = req.params.id;
        // res.json(payload);
        const student = await GroupStudent.create(payload);

        res.status(201).json({
            status: 'success',
            message: 'data added successfully',
            data: student
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const FetchGroupStudent: RequestHandler = async (req, res, next) => {
    try {

        const students = await GroupStudent.aggregate([
            {
                $match: { study_group_id: req.params.id }
            },
            {
                $lookup: {
                    from: 'studygroups',
                    localField: 'study_group_id',
                    foreignField: '_id',
                    as: 'studygroups'
                }
            },
            {
                $project: {
                    student_id: 1,
                    first_name: 1,
                    last_name: 1,
                    nationality: 1,
                    gender: 1,
                    type: 1,
                    special_needs: 1,
                    allergy: 1,
                    document_number: 1,
                    date_of_expiry: 1,
                    country_of_issue: 1,
                    allergy_to: 1,
                    email: 1,
                    contact_number: 1,
                    study_group_id: 1
                }
            }
        ]);

        res.json({
            status : 'success',
            message : 'Student fetch successfully',
            data : students
        })
    }
    catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const GroupStudentById: RequestHandler = async (req, res, next) => {

}

export const UpdateGroupStudent: RequestHandler = async (req, res, next) => {

}

export const DeleteGroupStudent: RequestHandler = async (req, res, next) => {

}

