import express from 'express';
import { verifieToken } from '../middelwares/auth.js';

import { deleteUser, getUserById, getUsers, signup, updateUser, sign, verifyEmail, forgotPassword, resetPassword, getMyUser, updateMyUser } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/sign', sign)

// Route pour le mot de passe oublié & Route pour la réinitialisation du mot de passe.
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword)

// Route pour l'email à vérifier
router.get('/verify', verifyEmail)

// Route pour récupérer les informations depuis "Mon Profil"
router.get('/profile', verifieToken, getMyUser)

// Route pour l'update depuis la page "Mon Profil"
router.put('/profile', verifieToken, updateMyUser)

router.get('/get', getUsers)
router.put('/update/:id', verifieToken, updateUser)
router.delete('/delete/:id', verifieToken, deleteUser)

router.get('/get/:id', getUserById)

export default router