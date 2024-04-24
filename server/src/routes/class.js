import express from 'express'
const router = express.Router()

import ClassController from '../app/controllers/ClassController.js'

router.post('/findClassByClassID', ClassController.findClassByClassID)
export default router
