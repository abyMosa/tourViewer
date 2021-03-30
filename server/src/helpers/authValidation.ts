import joi from "@hapi/joi";
import { IUser, IUserNoPassword } from '../models/User';

export const registerValidation = (data: IUser) => {
    const schema = joi.object({
        title: joi.string().min(2).max(255).required(),
        firstName: joi.string().min(3).max(255).required(),
        lastName: joi.string().min(4).max(255).required(),
        email: joi.string().min(6).max(255).email().required(),
        password: joi.string().min(6).max(1025).required()
    });
    return schema.validate(data);
}

export const loginValidation = (data: IUser) => {
    const schema = joi.object({
        email: joi.string().min(6).max(255).email().required(),
        password: joi.string().min(6).max(1025).required()
    });
    return schema.validate(data);
}

export const toUserNoPassword = (user: IUser): IUserNoPassword => {
    let userNoPass: IUserNoPassword = {
        _id: user._id,
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        registered: user.registered,
    }
    return userNoPass;
}
