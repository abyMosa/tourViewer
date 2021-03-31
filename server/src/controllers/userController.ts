import { Request, Response } from "express";
import User, { IUser, IUserNoPassword } from "../models/User";
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerValidation, loginValidation, toUserNoPassword } from '../helpers/authValidation';
import mongoose from 'mongoose';


export let users = async (req: Request, res: Response) => {
    let users = await User.find();
    res.status(200).send(users.map(toUserNoPassword));

};

export let user = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ error: true, message: "Invalid user id!" });

    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).send({ error: true, message: "User not found" });

    // let userNoPass: IUserNoPassword = user as IUserNoPassword;
    let userNoPass: IUserNoPassword = toUserNoPassword(user);
    res.status(200).send(userNoPass);
};

export let register = async (req: Request, res: Response) => {
    // validate request
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ error: true, message: error.details[0].message });

    // check if user exist 
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({ error: true, message: "User Exist" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const user: IUser = new User({
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const addedUser = await user.save();
        const token = jwt.sign({ _id: user._id, firstName: user.firstName, lastName: user.lastName }, process.env.TOKEN_SECRET!);
        res.header("auth-token", token).send({ token: token });

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: true, message: error });
    }

};

export const login = async (req: Request, res: Response) => {
    // validate request
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: true, message: error.details[0].message });

    // check if user exist 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ error: true, message: "User doesn't Exist" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ error: true, message: "Incorrect password" });

    const token = jwt.sign(
        { _id: user._id, firstName: user.firstName, lastName: user.lastName },
        process.env.TOKEN_SECRET!
    );

    res.header("auth-token", token).send({ token: token });
}
