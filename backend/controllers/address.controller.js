import Address from "../models/address.model.js";

export const createAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body)
        res.status(201).json(address)
    } catch (error) {
        console.log(error)
    }
};

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find().populate("member")
        res.status(200).json(addresses)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id).populate("member")
        // A ajouter plus tard à voir
        // if(!address) return res.status(404).json("Address not found !")
        res.status(200).json(address)
    } catch (error) {
        console.log(error)
    }
};

export const updateAddress = async (req, res) => {
    try {

        // Pourquoi ci-dessous alors que absent de service.controller ?
        const address = await Address.findById(req.params.id)
        // A ajouter plus tard à voir
        // if(!address) return res.status(404).json("Address not found !")

        const updateAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateAddress)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const deleteAddress = async (req, res) => {
    try {
        // Pourquoi ci-dessous alors que absent de service.controller ?
        const address = await Address.findById(req.params.id)
        // A ajouter plus tard à voir
        // if(!address) return res.status(404).json("Address not found !")

        const deleteAddress = await Address.findByIdAndDelete(req.params.id)
        res.status(200).json("Address deleted !")
    } catch (error) {
        console.log(error)
    }
};