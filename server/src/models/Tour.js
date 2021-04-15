const mongoose = require('mongoose');

// export interface ITour extends mongoose.Document {
//     name: string;
//     url: string;
//     user: string;
//     createdAt: Date;
// }

const TourSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    url: { type: String, required: true, },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tour", TourSchema);