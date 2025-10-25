import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './routes/userRouter.js';

dotenv.config({
    path: ".env"
})

const app = express();

const PORT = process.env.PORT || 3000

app.use("/api/v1/user" , userRouter);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);  
})
