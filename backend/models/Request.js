const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "Professional", required: true },
  category: { type: String, required: true },
  problemDescription: { type: String, required: true },
  urgency: { type: String, required: true },
  location: { type: Object, required: true },
  dateTime: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "InProgress", "Completed", "Cancelled"], default: "Pending" },
  checkInTime: { type: Date, default: null },
  checkOutTime: { type: Date, default: null },
  trackingCode: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("Request", RequestSchema);
