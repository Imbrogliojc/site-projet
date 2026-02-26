import express from "express";
import { env } from "./config/index.js";
import mongoose from "mongoose";

// ROUTES
import userRoutes from './routes/user.router.js'

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
app.use(express.json())

// PREFIX ROUTES
app.use('/api/user', userRoutes)

// SERVER
app.listen(PORT, () => {
    console.log(`LISTENING AT http://localhost:${PORT}`)
});