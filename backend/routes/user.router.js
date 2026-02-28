import express from 'express';

import { deleteUser, getUserById, getUsers, signup, updateUser } from '../controllers/user.controller.js'
import { sign } from 'jsonwebtoken';

const router = express.Router()

router.post('/signup', signup)
router.get('/get', getUsers)
router.get('/get/:id', getUserById)
router.delete('/delet/:id', deleteUser)
router.put('/update/:id', updateUser)
router.post('/sign', sign)

export default router