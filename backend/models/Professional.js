const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    experience: { type: String, required: true },
    location: {
      type: { type: String, default: "Point" }, // GeoJSON format
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    availability: [
      {
        day: { type: String, required: true }, // Example: "Monday"
        start: { type: String, required: true }, // Example: "09:00"
        end: { type: String, required: true }, // Example: "17:00"
      },
    ],
    isApproved: { type: Boolean, default: false },
    documents: [
      {
        type: { type: String, required: true }, // "ID Proof" or "Certificate"
        path: { type: String, required: true }, // File path
      },
    ],
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProfessionalSchema.index({ location: "2dsphere" }); // Enables geospatial queries

module.exports = mongoose.model("Professional", ProfessionalSchema);
