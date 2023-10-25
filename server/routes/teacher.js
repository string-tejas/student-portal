import { Router} from 'express'
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isTeacher from '../middlewares/isTeacher.js';
import { getSubmissionsForAssignment } from '../controllers/assignment';


const router = Router();

router.get("/teacher/assignment/submissions", isLoggedIn, isTeacher, getSubmissionsForAssignment)

