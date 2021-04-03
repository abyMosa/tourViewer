import * as mongoose from "mongoose";

export enum UserRole {
    Admin = "Admin",
    Regular = "Regular",
}

export interface IUser extends mongoose.Document {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    password: string;
    registered: Date;
}

export interface IUserNoPassword {
    _id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    registered: Date;
}

export const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    role: {
        type: String,
        required: true,
        default: UserRole.Regular
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    registered: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IUser>("User", UserSchema);