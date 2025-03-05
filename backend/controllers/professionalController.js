const User = require("../models/User"); // Import User model
const Professional = require("../models/Professional");
const generateToken = require("../utils/generateToken");

const loginProfessional = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email, password); // Debugging

  const user = await User.findOne({ email, role: "Professional" });

  if (!user) {
    console.log("User not found or incorrect role"); // Debugging
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    console.log("Password does not match"); // Debugging
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
};


const registerProfessional = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // Debugging

    const { name, email, password, phone, category, experience, region } = req.body;

    if (!name || !email || !password || !phone || !category || !experience || !region) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered." });
    }

    const newUser = new User({ name, email, password, phone, role: "Professional" });
    await newUser.save();

    const newProfessional = new Professional({
      user: newUser._id,
      category,
      experience,
      location: { coordinates: region.split(",").map(Number) },
      isApproved: false, 
    });

    await newProfessional.save();

    console.log("Successfully registered:", newUser._id); // Debugging
    res.status(201).json({ message: "Professional registered successfully.", userId: newUser._id });

  } catch (error) {
    console.error("Error registering professional:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



const getAllProfessionals = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isApproved: true };

    if (category) {
      filter.category = category;
    }

    const professionals = await Professional.find(filter)
      .populate("user", "name email phone");

    res.json(professionals.map(pro => ({
      _id: pro._id,
      name: pro.user.name,
      email: pro.user.email,
      phone: pro.user.phone,
      experience: pro.experience,
      location: pro.location.coordinates, // Returns [longitude, latitude]
    })));
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve professionals." });
  }
};

const getProfessionalProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the auth middleware

    // Find professional profile linked to the logged-in user
    const professional = await Professional.findOne({ user: userId }).populate("user", "name phone email");

    if (!professional) {
      return res.status(404).json({ message: "Professional profile not found." });
    }

    res.json({
      name: professional.user.name,
      phone: professional.user.phone,
      category: professional.category,
      experience: professional.experience,
      region: professional.location.coordinates.join(", "), // Convert [lat, long] to string
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching profile." });
  }
};




module.exports = { loginProfessional, registerProfessional, getAllProfessionals, getProfessionalProfile };
 