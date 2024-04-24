import express from 'express'
const router = express.Router()

import StudentController from '../app/controllers/StudentController.js'

router.post('/findStudentByAccountID', StudentController.findStudentByAccountID)
export default router
