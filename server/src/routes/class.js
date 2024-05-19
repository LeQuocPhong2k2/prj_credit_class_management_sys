import express from "express";
const router = express.Router();

import ClassController from "../app/controllers/ClassController.js";

router.post("/getClasCreditCourseCode", ClassController.getClasCreditCourseCode);
router.post("/findClassCredirBySemester", ClassController.getClasCreditBySemesterAndCurrentSV);
router.post("/findClassByClassID", ClassController.findClassByClassID);
router.post("/createClass", ClassController.createClass);
router.post("/addStudentToClass", ClassController.addStudentToClass);
router.post("/removeStudentFromClass", ClassController.removeStudentFromClass);
router.post("/findClassesByCourseID", ClassController.findClassesByCourseID);
router.post("/getClasCreditReLean", ClassController.getClasCreditReLean);
router.post("/getClassCreditDetailsByClassCode", ClassController.getClassCreditDetailsByClassCode);
router.post("/getClasCreditCompleteRegistration", ClassController.getClasCreditCompleteRegistration);
router.post("/getAllClass", ClassController.getAllClass);
router.post("/deleteClass", ClassController.deleteClass);
//confrimWaitList
router.post("/confrimWaitList", ClassController.confrimWaitList);
//canncel wait list
router.post("/cancelWaitList", ClassController.cancelWaitList);
export default router;
