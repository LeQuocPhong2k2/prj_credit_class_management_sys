import express from "express";
const router = express.Router();

import AdminController from "../app/controllers/AdminController.js";

router.post("/getInfoAdmin", AdminController.getInfoAdmin);
export default router;
