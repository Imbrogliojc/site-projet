// ====================
// EMAIL TEMPLATES
// ====================

// Ce fichier centralise les templates HTML des emails du projet.
// Les controllers gardent la logique métier.
// Les templates gèrent uniquement le contenu visuel des emails.

// ====================
// VERIFY EMAIL TEMPLATE
// ====================

// Email envoyé après l'inscription.
// Il permet à l'utilisateur de confirmer son adresse email
// grâce à un lien contenant un token de vérification.

export const verifyEmailTemplate = (verificationUrl) => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
                
                <h2 style="color: #222222; margin-bottom: 20px;">
                    Bienvenue sur CMS Auto
                </h2>

                <p style="color: #555555; font-size: 16px;">
                    Merci pour votre inscription.
                </p>

                <p style="color: #555555; font-size: 16px;">
                    Pour activer votre compte, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.
                </p>

                <p style="text-align: center; margin: 30px 0;">
                    <a 
                        href="${verificationUrl}" 
                        style="background-color: #ffc107; color: #000000; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;"
                    >
                        Vérifier mon email
                    </a>
                </p>

                <p style="color: #777777; font-size: 14px;">
                    Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :
                </p>

                <p style="color: #777777; font-size: 14px; word-break: break-all;">
                    ${verificationUrl}
                </p>

                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />

                <p style="color: #999999; font-size: 13px;">
                    CMS Auto
                </p>
            </div>
        </div>
    `
}

// ====================
// RESET PASSWORD TEMPLATE
// ====================

// Email envoyé lorsqu'un utilisateur demande à réinitialiser son mot de passe.
// Il contient un lien temporaire permettant d'accéder au formulaire de nouveau mot de passe.

export const resetPasswordTemplate = (resetUrl) => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
                
                <h2 style="color: #222222; margin-bottom: 20px;">
                    Réinitialisation de votre mot de passe
                </h2>

                <p style="color: #555555; font-size: 16px;">
                    Une demande de réinitialisation de mot de passe a été effectuée pour votre compte CMS Auto.
                </p>

                <p style="color: #555555; font-size: 16px;">
                    Pour définir un nouveau mot de passe, cliquez sur le bouton ci-dessous.
                </p>

                <p style="text-align: center; margin: 30px 0;">
                    <a 
                        href="${resetUrl}" 
                        style="background-color: #ffc107; color: #000000; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;"
                    >
                        Réinitialiser mon mot de passe
                    </a>
                </p>

                <p style="color: #777777; font-size: 14px;">
                    Ce lien est temporaire. S’il ne fonctionne pas, effectuez une nouvelle demande de réinitialisation.
                </p>

                <p style="color: #777777; font-size: 14px;">
                    Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet email.
                </p>

                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />

                <p style="color: #999999; font-size: 13px;">
                    CMS Auto
                </p>
            </div>
        </div>
    `
}

// ====================
// CONTACT EMAIL TEMPLATE
// ====================

// Email envoyé à l'entreprise lorsqu'un visiteur utilise le formulaire de contact.
// Il regroupe les informations saisies par l'utilisateur et le contenu du message.

export const contactEmailTemplate = ({ nom, prenom, email, telephone, sujet, message }) => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
                
                <h2 style="color: #222222; margin-bottom: 20px;">
                    Nouveau message de contact
                </h2>

                <p style="color: #555555; font-size: 16px;">
                    Un nouveau message a été envoyé depuis le formulaire de contact du site CMS Auto.
                </p>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 25px 0;">
                    <h3 style="color: #222222; font-size: 18px; margin-top: 0;">
                        Informations du contact
                    </h3>

                    <p><strong>Nom :</strong> ${nom}</p>
                    <p><strong>Prénom :</strong> ${prenom}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Téléphone :</strong> ${telephone}</p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h3 style="color: #222222; font-size: 18px;">
                        Sujet
                    </h3>
                    <p style="color: #555555; font-size: 16px;">
                        ${sujet}
                    </p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h3 style="color: #222222; font-size: 18px;">
                        Message
                    </h3>
                    <p style="color: #555555; font-size: 16px; white-space: pre-line;">
                        ${message}
                    </p>
                </div>

                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />

                <p style="color: #999999; font-size: 13px;">
                    CMS Auto — Formulaire de contact
                </p>
            </div>
        </div>
    `
}

// ====================
// NEW DEVIS ADMIN TEMPLATE
// ====================

// Email de notification envoyé à l'administrateur
// lorsqu'un utilisateur crée une nouvelle demande de devis.
// L'email reste volontairement simple : les détails sont consultables dans le dashboard admin.

export const newDevisAdminTemplate = () => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
                
                <h2 style="color: #222222; margin-bottom: 20px;">
                    Nouvelle demande de devis
                </h2>

                <p style="color: #555555; font-size: 16px;">
                    Une nouvelle demande de devis vient d’être envoyée depuis le site CMS Auto.
                </p>

                <p style="color: #555555; font-size: 16px;">
                    Connectez-vous au dashboard administrateur pour la consulter et la traiter.
                </p>

                <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />

                <p style="color: #999999; font-size: 13px;">
                    CMS Auto — Notification administrateur
                </p>
            </div>
        </div>
    `
}