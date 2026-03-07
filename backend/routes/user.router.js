import express from 'express';
import { verifieToken } from '../middelwares/auth.js';

import { deleteUser, getUserById, getUsers, signup, updateUser, sign } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/sign', sign)
router.get('/get', getUsers)
router.get('/get/:id', getUserById)
router.delete('/delet/:id', verifieToken, deleteUser)
router.put('/update/:id', verifieToken, updateUser)

export default router