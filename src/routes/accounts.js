import express from 'express'
const router = express.Router()

import AccountController from '../app/controllers/AccountController.js'

router.post('/login', AccountController.login)
export default router
