const express = require("express");
const { 
  loginAdmin, 
  registerAdmin, 
  approveProfessional, 
  getPendingProfessionals 
} = require("../controllers/adminController");

const router = express.Router();

// Route to fetch all unapproved professionals
router.get("/pending-professionals", getPendingProfessionals);

// Route to approve a professional
router.put("/approve/:id", approveProfessional);

// Admin authentication routes
router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

module.exports = router;
