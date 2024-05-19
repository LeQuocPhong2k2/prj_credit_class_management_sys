import express from "express";
const router = express.Router();

import TeacherController from "../app/controllers/TeacherController.js";

router.post("/findTeacherByAccountID", TeacherController.findTeacherByAccountID);
router.post("/findTeacherByID", TeacherController.findTeacherByID);
router.post("/getAllTeacher", TeacherController.getAllTeacher);
export default router;
