import express from 'express'
const router = express.Router()

import DepartmentController from '../app/controllers/DepartmentController.js'

router.post(
  '/findDepartmentByDepartmentID',
  DepartmentController.findDepartmentByDepartmentID
)
export default router
