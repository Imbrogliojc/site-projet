import express from "express";
import { env } from "./config/index.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

// ROUTES
import userRoutes from './routes/user.router.js'
import serviceRoutes from './routes/service.router.js'
import addressRoutes from './routes/address.router.js'
import devisRoutes from './routes/devis.router.js'
import reservationRoutes from './routes/reservation.router.js'

// APP EXPRESS
const app = express();

// PORT
const PORT = env.PORT || 8080;

// DATABASE MONGOOSE
mongoose
    .connect(env.MONGO_URI, {dbName: env.DB_NAME})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(error => console.log(error))

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// PREFIX ROUTES
app.use('/api/user', userRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/devis', devisRoutes)
app.use('/api/reservation', reservationRoutes)

// SERVER
app.listen(PORT, () => {
    console.log(`LISTENING AT http://localhost:${PORT}`)
});