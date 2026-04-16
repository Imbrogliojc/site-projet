import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendMail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: '"Mon site" <no-reply@monsite.com>',
            to,
            subject,
            html,
        });
        console.log("Email envoyé");

    } catch (error) {
        console.log("Erreur envoi email :", error)
    }
}