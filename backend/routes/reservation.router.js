import express from 'express';

import { createReservation, getReservations, getReservationById, updateReservation, deleteReservation } from "../controllers/reservation.controller.js";

const router = express.Router();

router.post('/create', createReservation)
router.get('/', getReservations)
router.get('/:id', getReservationById)
router.put('/update/:id', updateReservation)
router.delete('/delete/:id', deleteReservation)

export default router