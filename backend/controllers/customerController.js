const User = require("../models/User");
const Request = require("../models/Request");

const getCustomerRequests = async (req, res) => {
  const requests = await Request.find({ customer: req.user.id });
  res.json(requests);
};

// Register a new customer
const registerCustomer = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Create new user with role "Customer"
    const newCustomer = new User({
      name,
      phone,
      email,
      password,
      role: "Customer", // Ensure role is explicitly set
    });

    // Save to database
    await newCustomer.save();

    res.status(201).json({ message: "Customer registered successfully.", userId: newCustomer._id });
  } catch (error) {
    console.error("Error in registerCustomer:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};


module.exports = {registerCustomer, getCustomerRequests };
