import express,{ Router } from "express";
import z from 'zod';
import jwt from 'jsonwebtoken';
import { User } from "../db/models/user-model.js";
import bcrypt from "bcryptjs";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { Content } from "../db/models/content-model.js";
export const userRouter = Router();

enum StatusCodes {
    Success = 200,
    BadRequest = 400,
    Server_Error = 500,
    Conflict = 409,
    UserNotFound = 404
}

const requiredBody = z.object({
    email: z.email().min(3).max(30),
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

    const {email, password} = req.body

    const response = await User.findOne({email});

    if(!response) {
        return res.status(StatusCodes.UserNotFound).json({
            msg: "User Not Found"
        })
    }

    const passwordMatch = await bcrypt.compare(password, response.password)

    if(passwordMatch) {
        const token = jwt.sign({
            userId: response._id.toString()
        }, process.env.JWT_SECRET! ,
        {expiresIn: '1h'})

        return res.json({
            token
        })
    } else {
        return res.status(StatusCodes.BadRequest).json({
            msg: "Invalid Password"
        })
    }
})

userRouter.post("/content" ,userMiddleware, async (req,res) => {
   const {title, link ,type} = req.body

   await Content.create({
        link,
        title,
        type,
        // @ts-ignore
        userId: req.userId,
        tags: []
    })

    res.status(StatusCodes.Success).json({
        msg: "Content Added"
    })
})

userRouter.get("/content" ,userMiddleware, async (req,res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await Content.find({
        userId
    }).populate("userId" , "email")
    if(content) {
        res.json({
            content
        })
    }
})

userRouter.delete("/content" ,userMiddleware, async (req,res) => {
    const {contentId} = req.body

    await Content.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        msg: "Content Deleted"
    })
})

userRouter.post("/orbit/share" , async (req,res) => {
    
})

userRouter.post("/orbit/:shareLink" , async (req,res) => {
    
})