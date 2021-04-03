import mongoose from 'mongoose';


export interface IToken extends mongoose.Document {
    user: string;
    token: string;
    createdAt: Date;
}

const tokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, },
    token: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now, expires: 3600, },
});


export default mongoose.model<IToken>("Token", tokenSchema);