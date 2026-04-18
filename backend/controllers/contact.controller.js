import { sendMail } from "../services/mailer.js";

export const sendContactMail = async (req, res) => {
    try {
        const { nom, prenom, email, telephone, sujet, message } = req.body

        const html = `
            <h2>Nouveau message de contact</h2>
            <p><strong>Nom :</strong> ${nom}</p>
            <p><strong>Prénom :</strong> ${prenom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${telephone}</p>
            <p><strong>Sujet :</strong> ${sujet}</p>
            <p><strong>Message :</strong> ${message}</p>
        `

        await sendMail(
            "contact@monentreprise.com",
            `Contact : ${sujet}`,
            html
        )

        res.status(200).json("Email envoyé avec succès !")

    } catch (error) {
        console.log(error)
        res.status(500).json("Erreur envoi email !")
    }
}