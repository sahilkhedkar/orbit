import express,{ Router } from "express";
import z from 'zod';
import jwt from 'jsonwebtoken';
import { User } from "../db/models/user-model.js";
import bcrypt from "bcryptjs";
export const userRouter = Router();

const app = express();
app.use(express.json());

enum StatusCodes {
    Success = 200,
    BadRequest = 400,
    Server_Error = 500,
    Conflict = 409
}

const requiredBody = z.object({
    email: z.string().email().min(3).max(30),
    password: z.string().min(3).max(20),
    firstName: z.string().min(3).max(15),
    lastName: z.string().min(3).max(15)
})

type requiredBody = z.infer<typeof requiredBody>


userRouter.post("/signup" , async (req,res) => {
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success) {
        return res.status(StatusCodes.BadRequest).json({
            msg: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
    }

    const {email,password, firstName,lastName} = req.body;

    const existingUser = await User.findOne({
        email
    });

    if(existingUser) {
        return res.status(StatusCodes.Conflict).json({
            msg: "User Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

     await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
    })

    res.status(StatusCodes.Success).json({
        msg: "Signed up Successfully"
    })
})

userRouter.post("/signin" , async (req,res) => {
    
})

userRouter.post("/content" , async (req,res) => {
    
})

userRouter.get("/content" , async (req,res) => {
    
})

userRouter.delete("/content" , async (req,res) => {
    
})

userRouter.post("/orbit/share" , async (req,res) => {
    
})

userRouter.post("/orbit/:shareLink" , async (req,res) => {
    
})