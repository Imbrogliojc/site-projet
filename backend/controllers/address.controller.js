// ====================
// CONTROLLER ADDRESS
// ====================

// Entité permettant de gérer les adresses des utilisateurs.
// Une adresse est liée à un membre (user) et peut être utilisée pour les devis.

import Address from "../models/address.model.js";

// ====================
// USER ADDRESS
// ====================

// Fonctions utilisées depuis la page Profil.
// L'utilisateur connecté agit uniquement sur ses propres adresses grâce à req.user.id.

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
// UPDATE MY ADDRESS (USER)
// ====================

// Permet à l'utilisateur connecté de modifier une de ses propres adresses.
// On vérifie d'abord que l'adresse existe et qu'elle appartient bien au user connecté.

export const updateMyAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            member: req.user.id
        })
        if (!address) {
            return res.status(404).json("Address not found or not allowed !")
        }
        const updatedAddress = await Address.findByIdAndUpdate(
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
        res.status(200).json(updatedAddress)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// DELETE MY ADDRESS (USER)
// ====================

// Permet à l'utilisateur connecté de supprimer une de ses propres adresses.
// L'adresse est recherchée avec son id + le member connecté pour éviter de supprimer l'adresse d'un autre user.

export const deleteMyAddress = async (req, res) => {
    try {
        const address = await Address.findOne({
            _id: req.params.id,
            member: req.user.id
        })
        if (!address) {
            return res.status(404).json("Address not found or not allowed !")
        }
        await Address.findByIdAndDelete(req.params.id)
        res.status(200).json("Address deleted !")

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// ADMIN ADDRESS
// ====================

// Fonctions utilisées depuis le dashboard administrateur.
// L'admin peut consulter, modifier ou supprimer les adresses à partir de leur id.

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
// GET ADDRESS BY ID (ADMIN)
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
// UPDATE ADDRESS (ADMIN)
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
L'entité Address est liée à l'entité User grâce au champ member.

Rôle dans le projet :
- stocker les adresses associées à un utilisateur ;
- permettre à un utilisateur de posséder plusieurs adresses ;
- permettre la gestion des adresses depuis la page Profil ;
- préparer l'utilisation future d'une adresse lors d'une demande de devis.

Organisation du controller :
- une partie USER pour les actions réalisées depuis le profil utilisateur ;
- une partie ADMIN pour les actions réalisées depuis le dashboard administrateur.

Logique USER :
- createAddress crée une adresse pour l'utilisateur connecté grâce à req.user.id ;
- getMyAddress récupère uniquement les adresses du user connecté ;
- updateMyAddress modifie une adresse seulement si elle appartient au user connecté ;
- deleteMyAddress supprime une adresse seulement si elle appartient au user connecté.

Logique ADMIN :
- getAddresses récupère toutes les adresses pour le dashboard ;
- getAddressById récupère une adresse précise ;
- updateAddress permet à l'admin de modifier une adresse ciblée par son id ;
- deleteAddress permet à l'admin de supprimer une adresse ciblée par son id.

Point important :
- req.user.id sert à identifier l'utilisateur connecté via le token ;
- req.params.id sert à cibler une adresse précise dans l'URL ;
- pour les actions user sensibles comme update/delete, on utilise les deux afin d'éviter qu'un utilisateur modifie ou supprime l'adresse d'un autre utilisateur.

*/