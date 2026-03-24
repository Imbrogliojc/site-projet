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
            .populate({
                path: "devis",
                populate: [
                    { path: "member", select: "-password" },
                    { path: "service" }
                ]
            });
        res.status(200).json(reservations);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate({
                path: "devis",
                populate: [
                    { path: "member", select: "-password" },
                    { path: "service" }
                ]
            });
        if (!reservation) return res.status(404).json("Reservation not found !")
        res.status(200).json(reservation);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
        if (!reservation) return res.status(404).json("Reservation not found !")
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedReservation);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
        if (!reservation) return res.status(404).json("Reservation not found !")
        await Reservation.findByIdAndDelete(req.params.id)
        res.status(200).json("Reservation deleted !")

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};