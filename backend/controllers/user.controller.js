import Model from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from '../config/index.js';

export const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await Model.create({ ...req.body, password: hashedPassword });
        // request vers mongo
        res.status(201).json('User has been created !')
    } catch (error) {
        console.log(error)
    }
};

export const sign = async (req, res, next) => {
    try {
        const user = await Model.findOne({ email: req.body.email })
        if (!user) return res.status(404).json('User not found !')
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) return res.status(400).json('Wrong Credentials !')
        const token = jwt.sign(
            { id: user._id },
            env.TOKEN,
            { expiresIn: '24h' })
        const { password, ...others } = user._doc
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })
            .status(200
            .json(others)
            )
    } catch (error) {
        next(error)
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await Model.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await Model.findById(req.params.id)
        if (user) res.status(200).json(user)
        if (!user) res.status(404).json('User not found !')
    } catch (error) {
        console.log(error);
    }
};

/* 
DeleteUser (micro point technique)

Dans le PDF, ils utilisent :
await Model.findOneAndDelete(req.params.id)

Or normalement mongoose attend :
await Model.findByIdAndDelete(req.params.id)

Ce n’est pas dans le suivi, mais à vérifier dans ton code réel.
*/

export const deleteUser = async (req, res, next) => {
    try {
        const user = await Model.findById(req.params.id)
        if (!user) return res.status(404).json('User not found !')
        await Model.findOneAndDelete(req.params.id)
        res.status(200).json(`The User with th id ${req.params.id} has been deleted.`)
    } catch (error) {
        console.log(error)
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await Model.findById(req.params.id)
        if (!user) return res.status(404).json('User not found !')
        const updateUser = await Model.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({
            message: 'User updated',
            userUpdated
        })
    } catch (error) {
        console.log(error)
    }
};