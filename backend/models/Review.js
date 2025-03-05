const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  request: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "Professional", required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Review", ReviewSchema);
