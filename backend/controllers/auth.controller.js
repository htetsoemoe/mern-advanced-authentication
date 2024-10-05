import { User } from "../models/user.model.js"

export const signup = async (req, res) => {
    res.send("Hello from signup controller")
}

export const login = async (req, res) => {
    res.send("Hello from login controller")
}

export const logout = async (req, res) => {
    res.send("Hello from logout controller")
}