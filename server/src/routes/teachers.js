import express from 'express'
const router = express.Router()

import TeacherController from '../app/controllers/TeacherController.js'

router.post('/findTeacherByAccountID', TeacherController.findTeacherByAccountID)
export default router
