import { Router } from "express"
import  jwt  from "jsonwebtoken"
import z from 'zod'

export const UserRouter = Router()


enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Server_Error = 500,
    Error_in_input = 413
}

const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

type Profile = z.infer<typeof userProfileSchema>


UserRouter.post("/signup" , (req ,res) => {
    const parsedDatawithSuccess = userProfileSchema.safeParse(req.body)

    if(!parsedDatawithSuccess.success) {
        return res.status(ResponseStatus.Error_in_input).json({
            msg: "Incorrect Format",
            error: parsedDatawithSuccess.error
        })
    }
    
    
})

UserRouter.post("/signin" , (req ,res) => {
    res.status(ResponseStatus.Success).json({
        msg: "You are Signed in"
    })
})