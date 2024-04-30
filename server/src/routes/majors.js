import express from 'express'
const router = express.Router()

import MajorController from '../app/controllers/MajorController.js'

router.post('/findMajorByMajorID', MajorController.findMajorByMajorID)
export default router
