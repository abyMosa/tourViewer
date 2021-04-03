import * as mongoose from "mongoose";

export interface ITour extends mongoose.Document {
    name: string;
    image: string;
    url: string;
    user: string;
    createdAt: Date;
}

export const TourSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    image: { type: String },
    url: { type: String, required: true, },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITour>("Tour", TourSchema);