import express from "express";

import { createAddress, getAddresses, getAddressById, updateAddress, deleteAddress } from "../controllers/address.controller.js";

const router = express.Router();

router.post('/create', createAddress);
router.get('/', getAddresses);
router.get('/:id', getAddressById);
router.put('/update/:id', updateAddress);
router.delete('/delete/:id', deleteAddress);

export default router;