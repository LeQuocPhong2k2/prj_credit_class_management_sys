import express from 'express'
const router = express.Router()

import RegistrationController from '../app/controllers/RegistrationController.js'

router.post(
  '/findRegistrationByRegistrationID',
  RegistrationController.findRegistrationByRegistrationID
)
router.post(
  '/findRegistrationByStudentID',
  RegistrationController.findRegistrationByStudentID
)
export default router
