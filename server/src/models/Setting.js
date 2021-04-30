const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Setting", TourSchema);