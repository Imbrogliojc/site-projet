// ====================
// CONTROLLER ADDRESS
// ====================

// Entité permettant de gérer les adresses des utilisateurs.
// Une adresse est liée à un membre (user) et peut être utilisée pour les devis.

import Address from "../models/address.model.js";

// ====================
// CREATE ADDRESS (USER)
// ====================

// Création d'une adresse par un utilisateur connecté.
// L'adresse est automatiquement liée au user grâce au token (req.user.id)

export const createAddress = async (req, res) => {
    try {
        const address = await Address.create({
            ...req.body,
            member: req.user.id
        })
        res.status(201).json(address);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// GET ALL ADDRESSES (ADMIN)
// ====================

// Récupération de toutes les adresses, utilisé côté admin

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find().populate("member", "-password")
        res.status(200).json(addresses);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// GET MY ADDRESS (USER)
// ====================

// Récupère l'adresse de l'utilisateur connecté, c'est utilisé pour afficher et / ou modifier l'adresse depuis la page profil

export const getMyAddress = async (req, res) => {
    try {
        const address = await Address.find({ member: req.user.id })
            .populate("member", "-password")
        res.status(200).json(address)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// GET ADDRESS BY ID
// ====================

// Récupération d'une adresse spécifique via son ID, affichage ciblé

export const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id).populate("member", "-password")
        if (!address) return res.status(404).json("Address not found !")
        res.status(200).json(address);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// UPDATE ADDRESS (USER / ADMIN)
// ====================

// Mise à jour d'une adresse
// Utilisation de $set pour sécuriser les champs modifiables

export const updateAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id)
        if (!address) return res.status(404).json("Address not found !")
        const updateAddress = await Address.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    rue: req.body.rue,
                    codePostal: req.body.codePostal,
                    ville: req.body.ville,
                    numeroTelephone: req.body.numeroTelephone
                }
            },
            { new: true }
        )
        res.status(200).json(updateAddress);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// DELETE ADDRESS (ADMIN)
// ====================

// Suppression d’une adresse
// On vérifie l'existence de l'adresse avant sa Suppression

export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id)
        if (!address) return res.status(404).json("Address not found !")
        await Address.findByIdAndDelete(req.params.id)
        res.status(200).json("Address deleted !");

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// NOTES PROJET
// ====================

/* 
L'entité adresse est liée à l'entité membre (user).

Rôle dans le projet :
- stocker les informations du membre (user), adresse et n° de téléphone
- permettre au membre de gérer son profil
- l'entité sert de base pour les futurs devis

Utilisation :
- côté user : page Profil (getMyAddress + update)
- côté admin : gestion globale des adresses
*/