const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    name: { type: String, },
    description: { type: String, default: '' },
    url: { type: String, required: true, },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tour", TourSchema);