import Model from "../models/user.model.js"

export const signup = async (req, res) => {
    try {
        // request vers mongo
        res.status(201).json('User has been created !')
    } catch(error) {
        console.log(error)
    }
}