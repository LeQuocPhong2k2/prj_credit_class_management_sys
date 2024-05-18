import express from "express";
const router = express.Router();

import AccountController from "../app/controllers/AccountController.js";

router.post("/login", AccountController.login);
router.post("/checkAccountType", AccountController.checkAccountType);
router.post("/findAccountByID", AccountController.findAccountByID);
export default router;
