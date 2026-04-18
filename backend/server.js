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
import contactRoutes from './routes/contact.router.js'

// MODULE POUR CONVERTIR LES URL EN CHEMINS DE FICHIERS
import path from "path";
import { fileURLToPath } from "url";

// APP EXPRESS
const app = express();

// PORT
const PORT = env.PORT || 8080;

// MULTER
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DATABASE MONGOOSE
mongoose
    .connect(env.MONGO_URI, {dbName: env.DB_NAME})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(error => console.log(error))

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));

// PREFIX ROUTES
app.use('/api/user', userRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/devis', devisRoutes)
app.use('/api/reservation', reservationRoutes)
app.use('/api/contact', contactRoutes)

// SERVER
app.listen(PORT, () => {
    console.log(`LISTENING AT http://localhost:${PORT}`)
});