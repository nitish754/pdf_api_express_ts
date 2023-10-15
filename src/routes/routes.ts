import {Router} from 'express'
import { addTask, getExample, getExample2 } from '../controllers/exampleController';
import { AddTaskValidation } from '../validations/TaskValidation/TaskValidation';
import { Login, SignUp } from '../controllers/UserController';
import { LoginValidation, SignupValidation } from '../validations/user/UserValidation';
import { authChecker } from '../middleware/authChecker';
import { AddHostFamilyValidation } from '../validations/HostFamily/HostFamilyValidation';
import { AddHostFamily, HostFamilyList } from '../controllers/HostFamilyController';

const router = Router();
/**
 * testing routes
 */
router.get("/",authChecker,getExample)
router.get("/example",authChecker,getExample2)
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

export default router;