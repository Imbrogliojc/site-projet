import Devis from "../models/devis.model.js";

export const createDevis = async (req, res) => {
    try {
        const newDevis = new Devis({
            ...req.body,
            member: req.user.id
        });

        const savedDevis = await newDevis.save();
        res.status(201).json(savedDevis);

    } catch (error) {
        console.log(error)
        // res.status(500).json("Erreur lors de la création du devis")
    }
};

export const getDevis = async (req, res) => {
    try {
        const devis = await Devis.find()
            .populate("member")
            .populate("service");
        res.status(200).json(devis);

    } catch (error) {
        console.log(error)
        res.status(500).json("Erreur lors de la récupération des devis")
    }
};

export const getDevisById = async (req, res) => {
    try {
        const devis = await Devis.findById(req.params.id)
            .populate("member")
            .populate("service");
        // A ajouter plus tard à voir
        // if(!devis) return res.status(404).json("Devis not found !")
        res.status(200).json(devis);

    } catch (error) {
        console.log(error)
        res.status(500).json("Erreur lors de la récupération du devis")
    }
};

export const updateDevis = async (req, res) => {
    try {
        const devis = await Devis.findById(req.params.id)
        // A ajouter plus tard à voir
        // if(!devis) return res.status(404).json("Devis not found !")

        const updatedDevis = await Devis.findByIdAndUpdate(
            req.params.id,
            // Pourquoi pas cette syntaxe comme address ?   { $set: req.body }
            req.body,
            { new: true }
        )
        res.status(200).json(updatedDevis)
    } catch (error) {
        console.log(error)
        res.status(500).json("Erreur lors de la modification du devis")
    }
};

export const deleteDevis = async (req, res) => {
    try {

        const devis = await Devis.findById(req.params.id)
         // A ajouter plus tard à voir
        // if(!devis) return res.status(404).json("Devis not found !")

        await Devis.findByIdAndDelete(req.params.id)
        res.status(200).json("Devis deleted !")

    } catch (error) {
        console.log(error)
        res.status(500).json("Erreur lors de la suppression du devis")
    }
};