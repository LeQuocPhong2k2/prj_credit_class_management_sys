import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  } else {
    var ketqua = jwt.verify(token, "mk"); // check token có hợp lệ không
    if (ketqua) {
      next();
    }
  }
};

import StudentController from "../app/controllers/StudentController.js";

router.post("/findStudentByAccountID", verifyToken, StudentController.findStudentByAccountID);
router.post("/getCreditsByAccountID", verifyToken, StudentController.getCreditsByAccountID);
router.post("/registerClassCredit", verifyToken, StudentController.registerClassCredit);
router.post("/getClassSchedule", verifyToken, StudentController.getClassSchedule);
router.post("/getLearningResult", verifyToken, StudentController.getLearningResult);
export default router;
