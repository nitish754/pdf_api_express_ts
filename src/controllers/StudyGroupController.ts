import { RequestHandler } from "express";
import createHttpError from "http-errors";
import StudyGroup from "../model/StudyGroup";


export const StudyGroupList: RequestHandler = async (req, res, next) => {
    try {
        let { search } = req.query;
        let searchFilter = {};
        if (search) {
            searchFilter = { $or: [{ group_name: new RegExp(`${search}`, 'i') }, { tour_guide_contact: new RegExp(`${search}`, 'i') }, { tour_guide_email: new RegExp(`${search}`, 'i') }] };
        }
        const Groups = await StudyGroup.aggregate([
            { $match: searchFilter },
            {
                $lookup: {
                    'from': 'groupstudents',
                    'localField': '_id',
                    'foreignField': 'study_group_id',
                    'as': 'students'
                },

            },
            {
                $project: {
                    _id: 1,
                    group_id: 1,
                    group_name: 1,
                    country_origin: 1,
                    teacher_responsible: 1,
                    nationality: 1,
                    program_name: 1,
                    arrival_date: 1,
                    departure_date: 1,
                    tour_guide_contact: 1,
                    teacher_contact_number: 1,
                    tour_guide_email: 1,
                    teacher_email: 1,
                    school_visiting: 1,
                    tour_guide: 1,
                    totalStudents: { $size: '$students' }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ]);

        res.status(200).json({
            'status': 'success',
            'message': 'Group reterived successfully',
            'data': Groups
        })
    }
    catch (error) {
        return next(createHttpError.InternalServerError)
    }
}

export const AddStudyGroup: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        // const validateGroupId = await StudyGroup.findOne({ group_id: req.body.group_id }).count();
        const validateGroupName = await StudyGroup.findOne({ group_name: req.body.group_name }).count();
        // if (validateGroupId > 0) {
        //     return next(createHttpError(422, 'Group Id is alredy taken'))
        // }
        const group = await StudyGroup.findOne({}).sort({ _id: -1 });

        let group_id = '';
        if (group) {

            group_id = group?.group_id;

            //    res.json(group_id);

            const match = group_id?.match(/00(\d+)/);
            // res.json(match);

            if (match && match[1]) {
                let temp_id = parseInt(match[1]) + 1;

                // res.json(temp_id);

                if (temp_id <= 9) {
                    group_id = 'NG000' + temp_id.toString();
                } else {
                    group_id = 'NG00' + temp_id.toString();
                }


            }
            // group_id = 'NG0001'
        } else {
            group_id = 'NG0001';
        }

        // res.json(family_id);

        payload.group_id = group_id;
        // res.json(payload);

        if (validateGroupName > 0) {
            return next(createHttpError(422, 'Group Name already taken'))
        }
        const add = await StudyGroup.create(payload);

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
    try {
        const data = await StudyGroup.findById(req.params.id);


        if (data) {
            res.status(200).json({
                'status': 'success',
                'message': 'data reterived successfully',
                'data': data
            })
        } else {
            res.status(404).json({
                status: 'failed',
                message: 'Group Not Found',

            })
        }
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const UpdateStudyGroup: RequestHandler = async (req, res, next) => {
    try {
        // const validateGroupId = await StudyGroup.findOne({ group_id: req.body.group_id });
        const validateGroupName = await StudyGroup.findOne({ group_name: req.body.group_name });

        // if (validateGroupId?._id.toString() != req.params.id.toString()){
        //     return next(createHttpError(422, 'Group Id is already taken'))
        // }
        if (validateGroupName?._id != req.params.id) {
            return next(createHttpError(422, 'Group Name already taken'))
        }

        // update study group data 
        const update = await StudyGroup.findByIdAndUpdate(req.params.id, req.body);

        if (update) {
            res.status(204).json({
                'status': 'success',
                'message': 'Group Updated successfully'
            })
        }

    }
    catch (error) {
        return next(createHttpError.InternalServerError)
    }
}

export const DeleteStudyGroup: RequestHandler = async (req, res, next) => {
    try {
        const query = await StudyGroup.deleteOne({ _id: req.params.id });

        if (query) {
            res.status(204).json({
                status: 'success',
                message: 'Study group deleted successfully'
            });
        }
    }
    catch (error) {
        return next(createHttpError.InternalServerError)
    }
}


export const GenerateIdCardForGroup: RequestHandler = async (req, res, next) => {

}

export const GenerateLetterForGroup: RequestHandler = async (req, res, next) => {

}