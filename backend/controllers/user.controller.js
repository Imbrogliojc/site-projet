// ====================
// CONTROLLER USER
// ====================

// Gestion complète de l'utilisateur :
// inscription -> vérification email -> connexion -> reset password -> CRUD admin

import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from '../config/index.js';

// Import spécifique vérification Email & Reset Password
import crypto from "crypto";
import { sendMail } from '../services/mailer.js';
import { verifyEmailTemplate, resetPasswordTemplate } from "../services/templates/emailTemplates.js";

import { validatePassword } from "../services/passwordValidator.js";

// ====================
// VERIFY EMAIL
// ====================

// Recherche en base un membre dont le champs "verificationToken" correspond au token reçu dans l'URL
// Active le compte utilisateur

export const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.query.token })
        if (!user) {
            return res.status(400).json("Token invalide !")
        }
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        res.status(200).json("Email vérifié !")

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
};

// ====================
// FORGOT PASSWORD
// ====================

// On génère un token temporaire pour reset password
// Envoi d'un email avec lien contenant ce token

export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json("User not found !")

        // Génération du Token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Stockage du Token + expiration sous 1 heure
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 3600000;
        await user.save();

        // Lien du reset envoyé au frontend
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        // Envoi Email
        await sendMail(
            user.email,
            "Réinitialisation de votre mot de passe CMS Auto",
            resetPasswordTemplate(resetUrl)
        )

        res.status(200).json("Email sent !")

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// RESET PASSWORD
// ====================

// Vérifie le token + expiration
// Mise à jour du mot de passe (nouveau hash bcrypt)
// Supprime le token après utilisation

export const resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExpire: { $gt: Date.now() }
        })

        if (!user) return res.status(400).json("Token invalide ou expiré !")

        const passwordValidation = validatePassword(req.body.password)
        if (!passwordValidation.isValid) {
            return res.status(400).json("Le mot de passe ne respecte pas les règles de sécurité !")
        }

        // Nouveau password hashed avec bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpire = null;

        await user.save();

        res.status(200).json("Password reset successful !")

    } catch (error) {
        console.log(error)
        res.status(500).json((error.message))
    }
}

// ====================
// SIGNUP (REGISTER)
// ====================

// Création d'un utilisateur
// Génération d'un token de vérification email
// Envoi d'un email de confirmation

export const signup = async (req, res) => {
    // Génération d’un token unique pour la vérification email
    const verificationToken = crypto.randomBytes(32).toString("hex");

    try {
        const passwordValidation = validatePassword(req.body.password)
        if (!passwordValidation.isValid) {
            return res.status(400).json("Le mot de passe ne respecte pas les règles de sécurité !")
        }

        // Hash password + création de l'utilisateur avec le token de vérification
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({ ...req.body, password: hashedPassword, verificationToken });

        // Envoi email de vérification
        const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`;

        await sendMail(
            req.body.email,
            "Vérification de votre compte CMS Auto",
            verifyEmailTemplate(verificationUrl)
        )

        res.status(201).json('User has been created !')

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// SIGN (LOGIN)
// ====================

// Authentification de l'utilisateur
// Vérification de l'email obligatoire
// Génération JWT + cookie HTTPOnly

export const sign = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json('User not found !')

        // Bloquer connexion si email non vérifié
        if (!user.isVerified) {
            return res.status(403).json("Veuillez vérifier votre email !")
        }

        // Vérification du password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) return res.status(400).json('Wrong Credentials !')

        // Génération JWT
        const token = jwt.sign(
            { id: user._id },
            env.TOKEN,
            { expiresIn: '24h' })

        const { password, ...others } = user._doc

        // Envoi du cookie sécurisé
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })
            .status(200)
            .json(others)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// GET ALL USERS (ADMIN)
// ====================

// Récupération de tous les utilisateurs

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
};

// ====================
// GET USERS BY ID
// ====================

// Récupération d'un utilisateur spécifique via son ID

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        if (!user) return res.status(404).json("User not found !")
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
};

// ====================
// GET MY USER
// ====================

// Récupère les informations de l'utilisateur connecté
// Utilise req.user.id (injecté par le middleware JWT)
// Permet d'afficher les données sur la page Profil

export const getMyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// UPDATE MY USER
// ====================

// Permet à l'utilisateur connecté de modifier ses informations personnelles
// Utilise req.user.id (injecté par le middleware JWT)

// Sécurité :
// - whitelist des champs modifiables (userName, email), aucun accès au rôle

export const updateMyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) return res.status(404).json('User not found !')
        const userUpdated = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: {
                    userName: req.body.userName,
                    email: req.body.email
                }
            },
            { new: true }
        ).select("-password")
        res.status(200).json(userUpdated)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// UPDATE PASSWORD (USER)
// ====================

// Permet à un utilisateur connecté de modifier son mot de passe

// Étapes :
// 1. récupération du user via req.user.id (JWT)
// 2. vérification de l'ancien mot de passe (bcrypt.compare)
// 3. hash du nouveau mot de passe (bcrypt.hash)
// 4. mise à jour en base

// Important :
// - le mot de passe n'est jamais stocké en clair
// - vérification obligatoire pour éviter toute modification frauduleuse

export const updateMyPassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json("User not found !")

        // Vérifier ancien password
        const isMatch = await bcrypt.compare(req.body.oldPassword, user.password)
        if (!isMatch) return res.status(400).json("Mot de passe incorrect !")

        const passwordValidation = validatePassword(req.body.newPassword)
        if (!passwordValidation.isValid) {
            return res.status(400).json("Le nouveau mot de passe ne respecte pas les règles de sécurité !")
        }

        // Nouveau password hash
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10)

        user.password = hashedPassword
        await user.save()

        res.status(200).json("Mot de passe mis à jour !")

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// DELETE MY ACCOUNT
// ====================

// Permet à un utilisateur connecté de supprimer son propre compte

// Étapes :
// 1. récupération du user via req.user.id (JWT)
// 2. suppression du user en base de données
// 3. suppression du cookie JWT (logout automatique)

// Important :
// - route sécurisée (verifieToken)
// - aucune suppression par id externe (sécurité)
// - impact direct sur les données liées (devis, réservation)

export const deleteMyAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json("User not found !")

        await User.findByIdAndDelete(req.user.id)

        res.clearCookie("access_token")

        res.status(200).json("Compte supprimé")

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

// ====================
// UPDATE USER (ADMIN)
// ====================

// Route protégée par verifieToken : l'utilisateur doit être connecté
// req.user.id identifie l'utilisateur connecté via le JWT
// req.params.id identifie l'utilisateur ciblé par l'action admin

// ATTENTION : verifieToken vérifie l'authentification, mais ne vérifie pas encore le rôle admin
// AMELIORATION PREVUE : ajouter un middleware verifyAdmin entre verifieToken et le controller

// Exemple futur : router.put('/update/', verifieToken, verifyAdmin, updateUser)
// Choix actuel : ne pas dupliquer la vérification admin dans chaque controller, mais centraliser cette logique dans un middleware dédié

/*
Solution non retenue pour l'instant : vérifier le rôle admin directement dans le controller

const connectedUser = await User.findById(req.user.id)
if (!connectedUser || connectedUser.role !== "admin") {
    return res.status(403).json("Accès non autorisé")
}

Cette solution fonctionne, mais elle mélange :
- la vérification d'autorisation ;
- et la logique métier du controller.

Elle oblige aussi à répéter le même code dans plusieurs fonctions admin :
updateUser, deleteUser, updateDevis, deleteDevis, updateReservation, etc.
*/

export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json('User not found !')

        const userUpdated = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    userName: req.body.userName,
                    email: req.body.email,
                    isAdmin: req.body.isAdmin
                }
            },
            { new: true }
        ).select("-password")

        res.status(200).json({
            message: 'User updated',
            userUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// DELETE USER
// ====================

// Suppression d'un utilisateur

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json('User not found !')
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json(`The User with th id ${req.params.id} has been deleted.`)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ====================
// NOTES PROJET
// ====================

/* 
Cycle utilisateur :
signup -> verifyEmail -> login -> forgotPassword -> resetPassword

Les points importants :
- vérification de l'email obligatoire avant première connexion
- token de réinitialisation temporaire (1 heure)
- password toujours "hashé" avec bcrypt
- JWT stocké en cookie HTTPOnly

Sécurité :
- le token est supprimé après utilisation
- on contrôle le délai d'expiration du token
- aucune donnée sensible exposée
*/