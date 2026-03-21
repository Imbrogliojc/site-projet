import Reservation from "../models/reservation.model.js"

export const createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation({
            ...req.body
        });

        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate("devis");
        res.status(200).json(reservations);

    } catch (error) {
        console.log(error)
        res.status(500).json("Erreur lors de la récupération des réservations")
    }
};

/* 
🎯 Ce que tu peux dire au formateur (simple et propre)

👉 Tu peux expliquer comme ça :

“Dans Reservation j’ai seulement la FK du devis.
J’utilise populate("devis") pour récupérer les informations nécessaires à l’affichage côté front (service, véhicule, etc.).
La sécurité est gérée via le token JWT, pas via le populate.”
*/

export const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate("devis")
        // A ajouter plus tard à voir
        // if(!reservation) return res.status(404).json("Reservation not found !")
        res.status(200).json(reservation);

    } catch (error) {
        console.log(error)
        res.status(500).json("Erreur lors de la récupération de la réservation")
    }
};

export const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
        // A ajouter plus tard à voir
        // if(!reservation) return res.status(404).json("Reservation not found !")

        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            // Pourquoi pas cette syntaxe comme address ?   { $set: req.body }
            req.body,
            { new: true }
        )
        res.status(200).json(updatedReservation)

    } catch (error) {
        console.log(error)
        res.status(500).json("Erreur lors de la modification de la réservation")
    }
};

export const deleteReservation = async (req,res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
        // A ajouter plus tard à voir
        // if(!reservation) return res.status(404).json("Reservation not found !")

        await Reservation.findByIdAndDelete(req.params.id)
        res.status(200).json("Reservation deleted !")

    } catch (error) {
        console.log(error)
        res.status(500).json("Erreur lors de la suppression de la réservation")
    }
};