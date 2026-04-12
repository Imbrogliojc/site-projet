import Devis from "../models/devis.model.js";

export const createDevis = async (req, res) => {
    try {
        // RECUPERATION des fichiers images depuis la requête
        const images = req.files || [];

        console.log("FILES :", images)
        console.log("BODY :", req.body)

        // EXTRACTION des chemins des images uploadées dans un tableau
        const imagePaths = images.map(file => `/uploads/${file.filename}`);

        const newDevis = new Devis({
            ...req.body,
            pieceJointe: imagePaths,
            member: req.user.id
        });

        const savedDevis = await newDevis.save();
        res.status(201).json(savedDevis);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const getDevis = async (req, res) => {
    try {
        const devis = await Devis.find()
            .populate("member", "-password")
            .populate("service");
        res.status(200).json(devis);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// FONCTION getMyDevis DEPUIS USER PROFILE

export const getMyDevis = async (req, res) => {
    try {
        const devis = await Devis.find({ member: req.user.id })
            .populate("service")
        res.status(200).json(devis)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const getDevisById = async (req, res) => {
    try {
        const devis = await Devis.findById(req.params.id)
            .populate("member", "password")
            .populate("service")
        if (!devis) return res.status(404).json("Devis not found !")
        res.status(200).json(devis);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const updateDevis = async (req, res) => {
    try {
        const devis = await Devis.findById(req.params.id)
        if (!devis) return res.status(404).json("Devis not found !")
        const updatedDevis = await Devis.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    prixTtc: req.body.prixTtc,
                    dateIt: req.body.dateIt,
                    heureIt: req.body.heureIt,
                    status: req.body.status
                },
            },
            { new: true }
        )
        res.status(200).json(updatedDevis);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const deleteDevis = async (req, res) => {
    try {

        const devis = await Devis.findById(req.params.id)
        if (!devis) return res.status(404).json("Devis not found !")
        await Devis.findByIdAndDelete(req.params.id)
        res.status(200).json("Devis deleted !")

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};