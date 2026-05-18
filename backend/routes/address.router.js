import express from "express";
import { verifieToken } from '../middelwares/auth.js';

import {
    createAddress,
    getMyAddress,
    updateMyAddress,
    deleteMyAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
} from "../controllers/address.controller.js";

const router = express.Router();

// ====================
// USER ADDRESS
// ====================

// Routes utilisées depuis la page Profil.
// Le user connecté agit uniquement sur ses propres adresses.

router.post('/create', verifieToken, createAddress);
router.get('/profile', verifieToken, getMyAddress);
router.put('/profile/:id', verifieToken, updateMyAddress);
router.delete('/profile/:id', verifieToken, deleteMyAddress);

// ====================
// ADMIN ADDRESS
// ====================

// Routes utilisées depuis le dashboard admin.
// L'admin cible une adresse précise grâce à son id.

router.get('/', getAddresses);
router.get('/:id', getAddressById);
router.put('/update/:id', updateAddress);
router.delete('/delete/:id', deleteAddress);

export default router;