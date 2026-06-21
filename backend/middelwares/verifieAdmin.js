// ====================
// VERIFY ADMIN — AMÉLIORATION FUTURE
// ====================

// Objectif futur :
// Ajouter un middleware dédié pour vérifier qu'un utilisateur connecté possède bien le rôle administrateur avant d'accéder aux routes sensibles.

// Ce fichier est conservé comme piste d'amélioration
// Il n'est pas encore branché dans les routes du projet

// Rappel :
// verifieToken vérifie l'authentification
// verifieAdmin vérifierait l'autorisation

// Exemple cible futur :
router.put('/update/:id', verifieToken, verifyAdmin, updateUser)
router.delete('/delete/:id', verifieToken, verifyAdmin, deleteUser)

// ====================
// SOLUTION 1 — SIMPLE
// ====================

// Principe : ajouter le rôle dans le JWT au moment du login

// Exemple dans user.controller.js :
const token = jwt.sign(
    { id: user._id, role: user.role },
    env.TOKEN,
    { expiresIn: "24h" }
)

// Puis vérifier directement le rôle depuis req.user :

// export const verifyAdmin = (req, res, next) => {
// if (req.user.role !== "admin") {
// return res.status(403).json("Accès admin refusé")
// }
// next()
// }

// Avantage :
// - simple à mettre en place
// - facile à comprendre

// Limite :
// - si le rôle de l'utilisateur change en base, le JWT conserve l'ancien rôle jusqu'à expiration ou reconnexion

// ====================
// SOLUTION 2 — PLUS DIFFICILE
// ====================

// Principe :
// garder seulement l'id dans le JWT
// quand une route admin est appelée le backend utilise l'id pour vérifier le rôle de l'utilisateur en base
// pour vérifier son rôle réel au moment de la requête

// import User from "../models/user.model.js"

// export const verifyAdmin = async (req, res, next) => {
// try {
// const connectedUser = await User.findById(req.user.id)
//     if (!connectedUser || connectedUser.role !== "admin") {
//         return res.status(403).json("Accès admin refusé")
//     }
//     next()
// } catch (error) {
//     console.log(error)
//     res.status(500).json(error.message)}}

// Avantage :
// - vérification plus fiable
// - le rôle est contrôlé directement en base

// Limite :
// - ajoute une requête MongoDB sur chaque route admin protégée
// - demande une mise en place plus propre et plus systématique

// ====================
// CHOIX ACTUEL
// ====================

// Pour la version actuelle du projet, cette amélioration est identifiée mais non implémentée
