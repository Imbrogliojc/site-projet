import express from 'express';
import { verifieToken } from "../middelwares/auth.js"

import { createReservation, getReservations, getReservationById, updateReservation, deleteReservation, getMyReservation } from "../controllers/reservation.controller.js";

const router = express.Router();

router.post('/create', verifieToken, createReservation)
router.get('/', verifieToken, getReservations)

// ROUTE getMyReservation DEPUIS USER PROFILE
router.get('/user', verifieToken, getMyReservation)

router.get('/:id', verifieToken, getReservationById)
router.put('/update/:id', verifieToken, updateReservation)
router.delete('/delete/:id', verifieToken, deleteReservation)


export default router