"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../service/jwt");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const user = (0, jwt_1.verifyToken)(token);
            req.user = user;
            next();
        }
        else {
            throw new Error("Please login and try again");
        }
    }
    catch (error) {
        res.status(401).json({ status: 'error', message: 'User not authorized' });
    }
};
exports.authMiddleware = authMiddleware;
