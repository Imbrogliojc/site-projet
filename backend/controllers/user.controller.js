import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from '../config/index.js';

export const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({ ...req.body, password: hashedPassword });
        res.status(201).json('User has been created !')

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const sign = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
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
            .status(200)
            .json(others)
            
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json("User not found !")
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
};

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

export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json('User not found !')
        const userUpdated = await User.findByIdAndUpdate(
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
        res.status(500).json(error.message)
    }
};