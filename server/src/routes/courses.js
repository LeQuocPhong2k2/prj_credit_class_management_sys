import express from 'express'
const router = express.Router()

import CourseController from '../app/controllers/CourseController.js'

router.post('/findCourseByCourseID', CourseController.findCourseByCourseID)
export default router
