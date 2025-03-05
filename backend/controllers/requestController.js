const mongoose = require("mongoose");
const Request = require("../models/Request");
const Professional = require("../models/Professional");
const User = require("../models/User"); 

const createRequest = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "Customer") {
      return res.status(403).json({ message: "Forbidden: Only customers can create requests." });
    }

    const customer = await User.findById(req.user._id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    if (!req.body.professionalId) {
      return res.status(400).json({ message: "professionalId is required." });
    }

    const professionalId = new mongoose.Types.ObjectId(req.body.professionalId);
    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found." });
    }

    const newRequest = new Request({
      customer: customer._id,
      professional: professional._id,
      category: req.body.category,
      problemDescription: req.body.problemDescription,
      urgency: req.body.urgency,
      location: req.body.location,
      dateTime: req.body.dateTime,
      trackingCode: Math.random().toString(36).substr(2, 10),
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate("customer", "name email");
    if (!request) return res.status(404).json({ error: "Request not found" });

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const acceptRequest = async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.params.requestId, { status: "Accepted" }, { new: true });
  request ? res.json(request) : res.status(404).json({ message: "Request not found" });
};

const checkIn = async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.params.requestId, { status: "InProgress", checkInTime: new Date() }, { new: true });
  request ? res.json(request) : res.status(404).json({ message: "Request not found" });
};

const checkOut = async (req, res) => {
  const request = await Request.findByIdAndUpdate(req.params.requestId, { status: "Completed", checkOutTime: new Date() }, { new: true });
  request ? res.json(request) : res.status(404).json({ message: "Request not found" });
};

const getRequestsForProfessional = async (req, res) => {
  try {
    const { professionalId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(professionalId)) {
      return res.status(400).json({ message: "Invalid professional ID." });
    }

    const requests = await Request.find({ professional: professionalId, status: "Pending" })
      .populate("customer", "name email");

    if (!requests.length) {
      return res.status(404).json({ message: "No pending requests found." });
    }

    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching requests for selected technician:", error);
    res.status(500).json({ error: "Server error" });
  }
};






module.exports = { createRequest, getRequestById, acceptRequest, checkIn, checkOut, getRequestsForProfessional };
