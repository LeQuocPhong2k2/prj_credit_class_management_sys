import express from "express";
const router = express.Router();

import GraduationController from "../app/controllers/GraduationController.js";

router.post("/findGraduationByStudentID", GraduationController.findGraduationByStudentID);
export default router;
