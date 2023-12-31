import { RequestHandler } from "express";
import createHttpError from "http-errors";
import GroupStudent from "../model/GroupStudent";
import HostFamily from "../model/HostFamily";




export const AddStudentToGroup: RequestHandler = async (req, res, next) => {
    try {
        const payload = req.body;
        if (payload.email) {
            const validateEmail = await GroupStudent.findOne({ email: req.body.email, study_group_id: req.params.id }).count();
            if (validateEmail > 0) {
                return next(createHttpError(422, "Email is already exist in this group"));
            }
        }
        let group_id = req.params.group_id;
        if(group_id)
        {
            payload.study_group_id = group_id;
        }

        // create student id 
        const group = await GroupStudent.findOne({}).sort({ _id: -1 });

        let student_id = '';
        if (group) {

            student_id = group?.student_id;

            //    res.json(group_id);

            const match = student_id?.match(/00(\d+)/);
            // res.json(match);

            if (match && match[1]) {
                let temp_id = parseInt(match[1]) + 1;

                // res.json(temp_id);

                if (temp_id <= 9) {
                    student_id = 'NS000' + temp_id.toString();
                } else {
                    student_id = 'NS00' + temp_id.toString();
                }


            }
            // student_id = 'NS0001'
        } else {
            student_id = 'NS0001';
        }

        // res.json(family_id);

        payload.student_id = student_id;

        // end 
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
        let filter = {};
        let search = req.query.search
        let group_id =  req.params.group_id;
        if(group_id)
        {
            if (search) {
                filter = { $and: [{ study_group_id: group_id }, { $or: [{ first_name: new RegExp(`${search}`, 'i') }, { last_name: new RegExp(`${search}`, 'i') }, { email: new RegExp(`${search}`, 'i') }] }] }
            } else {
                filter = { study_group_id: group_id };
            }
        }
        if(!group_id)
        {
            if (search) {
                filter = { $and: [{ host_family_id: null }, { $or: [{ first_name: new RegExp(`${search}`, 'i') }, { last_name: new RegExp(`${search}`, 'i') }, { email: new RegExp(`${search}`, 'i') }] }] }
            } else {
                filter = { host_family_id: null };
            }
        }
        
        const students = await GroupStudent.find(filter)
            .populate('host_family_id', '_id personal_info.full_name')
            .sort({ _id: -1 });


        res.json({
            status: 'success',
            message: 'Student fetch successfully',
            data: students
        })
    }
    catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const GroupStudentById: RequestHandler = async (req, res, next) => {
    try {
        const student = await GroupStudent.findById(req.params.id).populate('host_family_id', '_id personal_info.full_name');

        if (student) {
            res.json({
                status: 'success',
                message: 'Student fetch successfully',
                data: student
            });
        } else {
            res.status(404).json({
                status: 'failed',
                message: 'Student Not Found',

            })
        }

    } catch (error) {
        return next(createHttpError(createHttpError.InternalServerError));
    }
}

export const UpdateGroupStudent: RequestHandler = async (req, res, next) => {
    try {
        await GroupStudent.findByIdAndUpdate(req.params.id, req.body);

        res.status(204).json({
            status: 'success',
            message: 'Student fetch successfully',
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const DeleteGroupStudent: RequestHandler = async (req, res, next) => {
    try {
        await GroupStudent.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            message: 'Student deleted successfully'
        });
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

export const AssignHostFamily: RequestHandler = async (req, res, next) => {
    try {
        if(req.body.host_family_id)
        {
            // check if no of bed is available 
            const hostfamily = await HostFamily.findById(req.body.host_family_id);
            if(hostfamily)
            {
                let total_bed = hostfamily.personal_info.total_no_of_bed;
                let occoupied_bed = await GroupStudent.find({host_family_id : req.body.host_family_id}).count();

                if(occoupied_bed >= parseInt(total_bed))
                {
                    return next(createHttpError(422,"No bed available for assignment"));
                }

                await GroupStudent.findByIdAndUpdate(req.params.id, {
                    host_family_id: req.body.host_family_id
                })
            }else{
                return next(createHttpError(422,"Invalid Host Family Id"));
            }
            
        }
        else{
            await GroupStudent.findByIdAndUpdate(req.params.id, {
                host_family_id: null
            })
        }
        res.status(204).json({
            status: 'success',
            message: 'Host Family Assigned successfully'
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}

// export const RemoveHostFamily: RequestHandler = async (req, res, next) => {
//     try {
//         const assignFamily = await GroupStudent.findByIdAndUpdate(req.params.id, {
//             host_family_id: req.body.host_family_id
//         })
//         if (assignFamily) {
//             res.status(204).json({
//                 status: 'success',
//                 message: 'Host Family Assigned successfully'
//             })
//         }
//     } catch (error) {
//         return next(createHttpError.InternalServerError);
//     }
// }

