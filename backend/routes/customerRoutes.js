const express = require("express");
const { registerCustomer, getCustomerRequests } = require("../controllers/customerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/requests", protect, getCustomerRequests);
router.post("/register", registerCustomer);

module.exports = router;
