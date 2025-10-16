import { Router } from "express"

export const UserRouter = Router()


enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Server_Error = 500,
    Error_in_input = 413
}

UserRouter.post("/signup" , (req ,res) => {
    res.status(ResponseStatus.Success).json({
        msg: "You are Signed Up"
    })
})

UserRouter.post("/signin" , (req ,res) => {
    res.status(ResponseStatus.Success).json({
        msg: "You are Signed in"
    })
})