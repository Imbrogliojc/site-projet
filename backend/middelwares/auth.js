import jwt from 'jsonwebtoken';
import { env } from '../config/index.js';
import { createError } from './error.js';

export const verifieToken = (req, res, next) => {
    const token = req.cookie.access_token;
    if (!token) return next(createError(401, "Acces Denied"))
    jwt.verify(token, env.TOKEN, (err, user) => {
        if (err) {
            return next(createError(403, "Token non valide !"))
        } req.user = user
        next();
    })
}