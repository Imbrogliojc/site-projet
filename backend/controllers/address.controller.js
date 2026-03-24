import Address from "../models/address.model.js";

export const createAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body)
        res.status(201).json(address);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find().populate("member", "-password")
        res.status(200).json(addresses);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id).populate("member", "-password")
        if(!address) return res.status(404).json("Address not found !")
        res.status(200).json(address);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const updateAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id)
        if(!address) return res.status(404).json("Address not found !")
        const updateAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateAddress);

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id)
        if(!address) return res.status(404).json("Address not found !")
        await Address.findByIdAndDelete(req.params.id)
        res.status(200).json("Address deleted !");

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};