import express from 'express';

import { createService, getServices, getServiceById, updateService, deleteService } from "../controllers/service.controller.js";

const router = express.Router()

router.post('/create', createService)
router.get('/', getServices)
router.get('/:id', getServiceById)
router.put('/update/:id', updateService)
router.delete('/delete/:id', deleteService)

export default router