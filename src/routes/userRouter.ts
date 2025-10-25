import { Router } from "express";
import z from 'zod';
import jwt from 'jsonwebtoken';
export const userRouter = Router();

enum StatusCodes {
    Success = 200,
    NotFound = 404,
    Server_Error = 500
}

const requiredBody = z.object({
    email: z.string().email().min(3).max(30),
    password: z.string().min(3).max(20),
    firstName: z.string().min(3).max(15),
    lastName: z.string().min(3).max(15)
})

type requiredBody = z.infer<typeof requiredBody>


userRouter.post("/signup" , async (req,res) => {

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