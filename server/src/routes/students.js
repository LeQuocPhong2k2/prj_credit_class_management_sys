import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  } else {
    var ketqua = jwt.verify(token, "mk");
    if (ketqua) {
      next();
    }
  }
};

import StudentController from "../app/controllers/StudentController.js";

router.post("/findStudentByAccountID", verifyToken, StudentController.findStudentByAccountID);
export default router;
