import express from 'express';
import { verifieToken } from '../middelwares/auth.js';

import { createDevis, getDevis, getDevisById, updateDevis, deleteDevis, getMyDevis } from "../controllers/devis.controller.js";

const router = express.Router();

router.post('/create', verifieToken, createDevis)
router.get('/', getDevis)

// ROUTE getMyDevis DEPUIS USER PROFILE
router.get('/user', verifieToken, getMyDevis)

router.get('/:id', getDevisById)
router.put('/update/:id', updateDevis)
router.delete('/delete/:id', deleteDevis)


export default router