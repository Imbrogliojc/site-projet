import express from "express";
import { verifieToken } from '../middelwares/auth.js';

import { createAddress, getAddresses, getAddressById, updateAddress, deleteAddress, getMyAddress } from "../controllers/address.controller.js";

const router = express.Router();

router.post('/create', createAddress);
router.get('/', getAddresses);

router.get('/profile', verifieToken, getMyAddress)

router.get('/:id', getAddressById);
router.put('/update/:id', updateAddress);
router.delete('/delete/:id', deleteAddress);

export default router;