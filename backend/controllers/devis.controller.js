// ====================
// CONTROLLER DEVIS
// ====================

// Entité principale du projet qui permet de gérer le cycle métier :
// demande -> traitement -> validation -> réservation -> archivage

import Devis from "../models/devis.model.js";
import fs from "fs";
import path from "path";

// ====================
// CREATE DEVIS (USER)
// ====================

// Création d'un devis par un utilisateur connecté

export const createDevis = async (req, res) => {
    try {
        // Upload d'images via Multer (req.files)
        const images = req.files || [];
        const imagePaths = images.map(file => `/uploads/${file.filename}`);

        // Association automatique avec le user (req.user.id)
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

// ====================
// GET ALL DEVIS (ADMIN)
// ====================

// Récupération de tous les devis utilisés dans le dashboard admin
// Populate pour afficher member + admin

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

// ====================
// GET DEVIS BY ID
// ====================

// Récupération d'un devis spécifique

export const getDevisById = async (req, res) => {
    try {
        const devis = await Devis.findById(req.params.id)
            .populate("member", "-password")
            .populate("service")
        if (!devis) return res.status(404).json("Devis not found !")
        res.status(200).json(devis);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// UPDATE DEVIS (ADMIN)
// ====================

// Update d'un devis par l'admin : prix, date, heure et changement de statut

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

// ====================
// DELETE DEVIS (ADMIN)
// ====================

// Suppression d'un devis par l'admin

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

// ====================
// GET MY DEVIS (USER)
// ====================

// Récupère uniquement les devis du user connecté pour les afficher sur la page Profil

export const getMyDevis = async (req, res) => {
    try {
        // Utilisation du middleware verifieToken (req.user.id)
        const devis = await Devis.find({ member: req.user.id })
            .populate("service")
        res.status(200).json(devis)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// ARCHIVE DEVIS (ADMIN)
// ====================

// Permet de mettre à jour le statut des devis (archived)
// Supprimer les images du server (fs) et de vider le tableau pieceJointe

export const archiveMyDevis = async (req, res) => {
    try {
        const devis = await Devis.findById(req.params.id)
        if (!devis) return res.status(404).json("Devis not found !")

        // Suppression des fichiers
        if (devis.pieceJointe && devis.pieceJointe.length > 0) {
            devis.pieceJointe.forEach((img) => {
                const filename = path.basename(img)
                const filePath = path.join("uploads", filename)
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
            })
        }
        // Update BDD
        const archiveMyDevis = await Devis.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    status: "archived",
                    pieceJointe: []
                }
            },
            { new: true }
        )
        res.status(200).json(archiveMyDevis)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

// ====================
// NOTES PROJET
// ====================

/* 
Le devis est l'entité centrale du projet, il est en relation avec :
- le user
- le service
- la réservation

Cycle métier principal :
pending -> validated -> reservation -> archived

Controller est utilisé aussi bien pour :
- côté user (création devis + profil)
- côté admin (gestion complète)
 */