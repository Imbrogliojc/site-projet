import express from 'express';
import { verifieToken } from '../middelwares/auth.js';

import { deleteUser, getUserById, getUsers, signup, updateUser, sign, verifyEmail, forgotPassword, resetPassword } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/sign', sign)

// Route pour le mot de passe oublié & Route pour la réinitialisation du mot de passe.
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword)

router.get('/get', getUsers)

// Route pour l'email à vérifier
router.get('/verify', verifyEmail)

router.get('/get/:id', getUserById)
router.delete('/delete/:id', verifieToken, deleteUser)
router.put('/update/:id', verifieToken, updateUser)

export default router