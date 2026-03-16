import Service from "../models/service.model.js";

export const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body)
        res.status(201).json(service)
    } catch (error) {
        console.log(error)
    }
};

export const getServices = async (req, res) => {
    try {
        const services = await Service.find()
        res.status(200).json(services)
    } catch (error) {
        console.log(error)
    }
};

export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        res.status(200).json(service)
    } catch (error) {
        console.log(error)
    }
};

export const updateService = async (req, res) => {
    try {
        const serviceUpdated = await Service.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(serviceUpdated)
    } catch (error) {
        console.log(error)
    }
};

export const deleteService = async (req, res) => {
    try {
        // Pourquoi quelque chose de cet ordre n'est pas fait ? A vérifier
        // const user = await Model.findById(req.params.id)
        // if (!user) return res.status(404).json('User not found !')
        await Service.findByIdAndDelete(req.params.id)
        res.status(200).json('Service deleted !')
    } catch (error) {
        console.log(error)
    }
};