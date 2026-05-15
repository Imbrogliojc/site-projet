import { sendMail } from "../services/mailer.js";
import { contactEmailTemplate } from "../services/templates/emailTemplates.js";

export const sendContactMail = async (req, res) => {
    try {
        const { nom, prenom, email, telephone, sujet, message } = req.body

        const html = contactEmailTemplate({
            nom,
            prenom,
            email,
            telephone,
            sujet,
            message
        })

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