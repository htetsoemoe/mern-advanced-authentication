import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { connectDB } from './db/connectDB.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3500
const __dirname = path.resolve()

app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.get("/", (req, res) => {
    res.send("Hello from advanced authentication project!")
})

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port: ${PORT}`)
})