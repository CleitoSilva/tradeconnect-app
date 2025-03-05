const User = require("../models/User");
const Professional = require("../models/Professional");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Attempt:", email); // Debug log

    const admin = await User.findOne({ email, role: "Admin" });
    if (!admin) {
      console.log("Admin not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Admin found:", admin);

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "Admin" },
      process.env.JWT_SECRET || "0dfd6bebe22d7031f77737c894f9db259633f9579f3e0bacaabb898ab9888204",
      { expiresIn: "1h" }
    );
    
    console.log("Token generated:", token);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const { name, phone, email, password, secretCode } = req.body;

    if (secretCode !== "333444") {
      return res.status(403).json({ message: "Invalid secret code" });
    }

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    const admin = new User({
      name,
      phone,
      email,
      password,  
      role: "Admin",
    });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error in registerAdmin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch pending professionals (Not approved yet)
const getPendingProfessionals = async (req, res) => {
  try {
    const pendingProfessionals = await Professional.find({ isApproved: false })
      .populate("user", "name email phone") // Fetch name, email, and phone from User model
      .select("category experience documents"); // Fetch category, experience, and documents from Professional model

    if (!pendingProfessionals.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(pendingProfessionals);
  } catch (error) {
    console.error("Error fetching pending professionals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Approve a Professional
const approveProfessional = async (req, res) => {
  try {
    const { id } = req.params;
    const professional = await Professional.findById(id);

    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    professional.isApproved = true;
    await professional.save();

    res.status(200).json({ message: "Professional approved successfully!" });
  } catch (error) {
    console.error("Error approving professional:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginAdmin, registerAdmin, approveProfessional, getPendingProfessionals };
