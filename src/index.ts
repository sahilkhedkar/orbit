import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserRouter } from './routes/user.js';

dotenv.config({
    path: ".env"
})

const app = express();

const PORT = process.env.PORT || 3000

app.use("/api/v1/user" , UserRouter)

app.listen(PORT , () => {
    console.log(`App is listening on Port ${PORT}`);
})