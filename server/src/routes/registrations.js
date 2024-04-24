import express from 'express'
const router = express.Router()

import RegistrationController from '../app/controllers/RegistrationController.js'

router.post(
  '/findRegistrationByRegistrationID',
  RegistrationController.findRegistrationByRegistrationID
)
export default router
