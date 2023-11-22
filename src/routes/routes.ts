import {Router} from 'express'
import { addTask, checkHttpCall, convertHtmlToPDF, getExample, getExample2 } from '../controllers/exampleController';
import { AddTaskValidation } from '../validations/TaskValidation/TaskValidation';
import { Login, SignUp, UpdateUser } from '../controllers/UserController';
import { LoginValidation, SignupValidation } from '../validations/user/UserValidation';
import { authChecker } from '../middleware/authChecker';
import { AddHostFamilyValidation, UpdateHostFamilyValidation } from '../validations/HostFamily/HostFamilyValidation';
import { AddHostFamily, DeleteHostFamily, GeneratePdf, HostFamilyList, UpdateFamily, findFamilyById } from '../controllers/HostFamilyController';
import { AddStudyGroupValidation, UpdateStudyGroupValidation } from '../validations/StudyGroup/StudyGroupValidation';
import { AddStudentToGroup, AssignHostFamily, DeleteGroupStudent, FetchGroupStudent, GroupStudentById,UpdateGroupStudent } from '../controllers/GroupStudentController';
import { AddStudyGroup, DeleteStudyGroup, StudyGroupById, StudyGroupList, UpdateStudyGroup } from '../controllers/StudyGroupController';
import { AddGroupStudentPayload, AssignHostFamilyPayload, UpdateGroupStudentPayload } from '../validations/GroupStudent/GroupStudentValidation';
import { AddBranch, DeleteBranch, FetchBranch, GetBranchById, UpdateBranch } from '../controllers/BranchController';
import { AddBranchPayload, UpdateBranchPayload } from '../validations/Branch/BranchValidation';
import { AddEmployeePayload, UpdateEmployeePayload } from '../validations/Employee/EmployeeValidation';
import { AddEmployee, DeleteEmployee, FetchEmployee, FetchEmployeeById, UpdateEmployee } from '../controllers/EmployeeController';
import { GenerateIdCard, HostFamilyDetailsPDF, HostFamilyLetter, StudyGroupCertificatePDF, print, viewHTML } from '../controllers/PDFController';

const router = Router();
/**
 * testing routes
 */
router.get('/view-html',viewHTML);
router.get("/html-to-pdf",print);
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

router.put('/user/update',authChecker,UpdateUser);

router.post('/add-host-family',authChecker,AddHostFamilyValidation,AddHostFamily)
router.get('/host-family',authChecker,HostFamilyList);
router.get('/host-family/:id',authChecker,findFamilyById);
router.put('/host-family/:id/update',authChecker,UpdateHostFamilyValidation,UpdateFamily);
router.delete('/host-family/:id/delete',authChecker,DeleteHostFamily);
router.get('/host-family/:id/download-pdf',authChecker,GeneratePdf);
router.get('/host-family/:id/pdf',authChecker,HostFamilyDetailsPDF);

// Study Group Routes 
router.get('/study-group',authChecker,StudyGroupList);
router.post('/add-study-group',authChecker,AddStudyGroupValidation,AddStudyGroup)
router.get('/study-group/:id/details',authChecker,StudyGroupById)
router.put('/study-group/:id/update',authChecker,UpdateStudyGroupValidation,UpdateStudyGroup)
router.delete('/study-group/:id/destroy',authChecker,DeleteStudyGroup)

// Group Student routes
router.get('/study-group/:group_id?/students',authChecker,FetchGroupStudent)
router.post('/study-group/:group_id?/student',authChecker,AddGroupStudentPayload,AddStudentToGroup)
router.get('/study-group/student/:id/details',authChecker,GroupStudentById)
router.put('/study-group/student/:id/update',authChecker,UpdateGroupStudentPayload,UpdateGroupStudent)
router.delete('/study-group/student/:id/delete',authChecker,DeleteGroupStudent)
router.put('/study-group/student/:id/assign-host-family',authChecker,AssignHostFamilyPayload,AssignHostFamily);
// branches 
router.post('/branch',authChecker,AddBranchPayload, AddBranch);
router.get('/branches',authChecker,FetchBranch);
router.get('/branch/:id',authChecker,GetBranchById)
router.put('branch/:id/update',authChecker,UpdateBranchPayload,UpdateBranch)
router.delete('/branch/:id/delete',authChecker,DeleteBranch)

// employee
router.post('/employee',authChecker,AddEmployeePayload, AddEmployee);
router.get('/employees',authChecker,FetchEmployee);
router.get('/employee/:id',authChecker,FetchEmployeeById)
router.put('employee/:id/update',authChecker,UpdateEmployeePayload,UpdateEmployee)
router.delete('/employee/:id/delete',authChecker,DeleteEmployee)

// pdf routes 
router.get('/study-group/:group_id/certificate',authChecker,StudyGroupCertificatePDF);
router.get('/study-group/:group_id/host-family/letter',authChecker,HostFamilyLetter);
router.get('/study-group/:group_id/student/card',authChecker,GenerateIdCard)

export default router;