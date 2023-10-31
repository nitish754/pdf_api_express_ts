import {Router} from 'express'
import { addTask, checkHttpCall, convertHtmlToPDF, getExample, getExample2 } from '../controllers/exampleController';
import { AddTaskValidation } from '../validations/TaskValidation/TaskValidation';
import { Login, SignUp } from '../controllers/UserController';
import { LoginValidation, SignupValidation } from '../validations/user/UserValidation';
import { authChecker } from '../middleware/authChecker';
import { AddHostFamilyValidation, UpdateHostFamilyValidation } from '../validations/HostFamily/HostFamilyValidation';
import { AddHostFamily, DeleteHostFamily, GeneratePdf, HostFamilyList, UpdateFamily, findFamilyById } from '../controllers/HostFamilyController';
import { AddStudyGroupValidation, UpdateStudyGroupValidation } from '../validations/StudyGroup/StudyGroupValidation';
import { AddStudentToGroup, FetchGroupStudent, GroupStudentById,UpdateGroupStudent } from '../controllers/GroupStudentController';
import { AddStudyGroup, DeleteStudyGroup, StudyGroupById, StudyGroupList, UpdateStudyGroup } from '../controllers/StudyGroupController';
import { AddGroupStudentPayload, UpdateGroupStudentPayload } from '../validations/GroupStudent/GroupStudentValidation';

const router = Router();
/**
 * testing routes
 */
router.get("/html-to-pdf",convertHtmlToPDF);
router.get("/",authChecker,getExample)
// router.get("/example",checkHttpCall)
router.get("/check-call",authChecker,checkHttpCall)
/**
 * routes accessible without authentication
 */
router.post('/auth/signup',SignupValidation,SignUp);
router.post('/auth/login',LoginValidation,Login)
/**
 * routes accessible with authenticationn
 */
router.post('/add-task',authChecker,AddTaskValidation,addTask)

router.post('/add-host-family',authChecker,AddHostFamilyValidation,AddHostFamily)
router.get('/host-family',authChecker,HostFamilyList);
router.get('/host-family/:id',authChecker,findFamilyById);
router.put('/host-family/:id/update',authChecker,UpdateHostFamilyValidation,UpdateFamily);
router.delete('/host-family/:id/delete',authChecker,DeleteHostFamily);
router.get('/host-family/:id/download-pdf',authChecker,GeneratePdf)

// Study Group Routes 
router.get('/study-group',authChecker,StudyGroupList);
router.post('/add-study-group',authChecker,AddStudyGroupValidation,AddStudyGroup)
router.get('/study-group/:id/details',authChecker,StudyGroupById)
router.put('/study-group/:id/update',authChecker,UpdateStudyGroupValidation,UpdateStudyGroup)
router.delete('/study-group/:id/destroy',authChecker,DeleteStudyGroup)

// Group Student routes
router.get('/study-group/:id/students',authChecker,FetchGroupStudent)
router.post('/study-group/:id/student',authChecker,AddGroupStudentPayload,AddStudentToGroup)
router.get('/study-group/:id/student/:id/details',authChecker,GroupStudentById)
router.put('/study-group/:id/student/:id/update',authChecker,UpdateGroupStudentPayload,UpdateGroupStudent)


export default router;