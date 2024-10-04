import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../service/jwt';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const user: any = verifyToken(token);
            req.user = user
            next();
        } else {
            throw new Error("Please login and try again");
        }

    } catch (error) {
        res.status(401).json({ status: 'error', message: 'User not authorized' })
    }
}