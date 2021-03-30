import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    registered: Date;
}

export interface IUserNoPassword {
    _id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
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