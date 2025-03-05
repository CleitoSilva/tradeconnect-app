const express = require("express");
const { getAllProfessionals, registerProfessional, loginProfessional, getProfessionalProfile } = require("../controllers/professionalController");
const { uploadDocuments } = require("../controllers/documentController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const Professional = require("../models/Professional"); // Add this if missing


const router = express.Router();

// Get all professionals
router.get("/", getAllProfessionals);

// Register a professional
router.post("/register", registerProfessional);

// Professional login route (ADD THIS)
router.post("/login", loginProfessional);

router.get("/profile", protect, getProfessionalProfile);

// Upload professional verification documents
router.post("/upload-documents", upload.fields([{ name: "idProof" }, { name: "certificate" }]), uploadDocuments);

router.put('/profile', protect, async (req, res) => {
    console.log("Authenticated User:", req.user); // Add this
    try {
        const { id } = req.user; 
        console.log("Updating profile for user ID:", id); // Add this
        
        const { name, phone, category, experience, region } = req.body;

        const professional = await Professional.findOneAndUpdate(
            { user: id }, 
            { name, phone, category, experience, region },
            { new: true, runValidators: true }
        );

        if (!professional) {
            return res.status(404).json({ message: 'Professional profile not found.' });
        }

        res.json(professional);
    } catch (error) {
        console.error("Error updating profile:", error.message);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

router.get("/availability", protect, async (req, res) => {
    try {
        const { id } = req.user; // Ensure the user is authenticated

        // Fetch availability from Professional model
        const professional = await Professional.findOne({ user: id }).select("availability");

        if (!professional) {
            return res.status(404).json({ message: "Professional profile not found." });
        }

        res.json(professional.availability);
    } catch (error) {
        console.error("Error fetching availability:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
});

router.put("/availability", protect, async (req, res) => {
    try {
        const { id } = req.user;
        const { availability } = req.body;

        const professional = await Professional.findOneAndUpdate(
            { user: id },
            { availability },
            { new: true, runValidators: true }
        );

        if (!professional) {
            return res.status(404).json({ message: "Professional profile not found." });
        }

        res.json({ message: "Availability updated successfully.", availability: professional.availability });
    } catch (error) {
        console.error("Error updating availability:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
});

  

module.exports = router;
