import express from 'express'
const router = express.Router()

import CourseController from '../app/controllers/CourseController.js'

router.post('/findCourseByCourseID', CourseController.findCourseByCourseID)
router.post('/findCoursesByCourseIDs', CourseController.findCoursesByCourseIDs)
export default router
