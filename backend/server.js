import express from "express";

// APP EXPRESS
const app = express();

// PORT
const PORT = process.env.PORT || 8000;

// MIDDELWARE
app.use(express.json())

// SERVER
app.listen(PORT, () => {
    console.log(`LISTENING AT http://localhost:${PORT}`);
})