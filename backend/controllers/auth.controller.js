import bcryptjs from "bcryptjs"
import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateToken/generateTokenAndSetCookie.js"

// Signup controller
export const signup = async (req, res) => {
    const { email, password, name } = req.body

    try {
        if (!email || !password || !name) {
            throw new Error("Please provide all the required fields")
        }

        // Check if the user already exists
        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            res.status(400).json({
                success: false,
                message: "USER_EMAIL_ALREADY_EXISTS",
            })
        }

        // Create a hashed password of user password
        const hashedPassword = await bcryptjs.hash(password, 10)

        // Generate a verification token: 6 digit random number
        const verificationToken = Math.floor(100000 + Math.random() * 900000)

        // Save a new user to the database
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
        })
        await user.save()

        // Generate a token and set it as a cookie
        const token = generateTokenAndSetCookie(res, user._id)

        res.status(201).json({
            user: {
                ...user._doc,
                password: undefined,
            },
            success: true,
            message: "SIGNUP_SUCCESS",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "SIGNUP_FAILED",
            error: error.message,
        })
    }
}

export const login = async (req, res) => {
    res.send("Hello from login controller")
}

export const logout = async (req, res) => {
    res.send("Hello from logout controller")
}