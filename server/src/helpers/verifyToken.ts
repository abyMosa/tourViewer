import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied!');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
        next();

    } catch (err) {
        return res.status(400).send('Invaild Token!');
    }
}

export const generateToken = (user: IUser) => {
    const token = jwt.sign(
        {
            _id: user._id,
            title: user.title,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            registered: user.registered,
            role: user.role
        },
        process.env.TOKEN_SECRET!
    );
    return token;
}