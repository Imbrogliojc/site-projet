import express from 'express';
import { verifieToken } from '../middelwares/auth.js';

import { createDevis, getDevis, getDevisById, updateDevis, deleteDevis, getMyDevis, archiveMyDevis } from "../controllers/devis.controller.js";

// Import du fichier multer.cjs
import upload from '../services/multer.cjs';


const router = express.Router();

// ROUTE permettant l'upload des images
router.post('/create', verifieToken, upload.array('img', 5), createDevis)

router.get('/', getDevis)

// ROUTE getMyDevis DEPUIS USER PROFILE
router.get('/user', verifieToken, getMyDevis)

router.get('/:id', getDevisById)
router.put('/update/:id', updateDevis)

// FONCTION archiveMyDevis DEPUIS DASHBOARD ADMIN
router.put('/archive/:id', archiveMyDevis)

router.delete('/delete/:id', deleteDevis)


export default router