import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]
    if (!header) {
        return res.status(401).json({ message: "Authorization header missing" })
    }

    try {
        const decoded = jwt.verify(header, process.env.JWT_SECRET!) as { userId: string }
        // @ts-ignore
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}