import express from 'express'
const router = express.Router()

import ClassController from '../app/controllers/ClassController.js'

router.post('/findClassByClassID', ClassController.findClassByClassID)
router.post('/createClass', ClassController.createClass)
router.post('/addStudentToClass', ClassController.addStudentToClass)
router.post('/removeStudentFromClass', ClassController.removeStudentFromClass)
export default router
