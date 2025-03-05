const express = require("express");
const {
  createRequest,
  getRequestById,
  acceptRequest,
  checkIn,
  checkOut,
  getRequestsForProfessional,
} = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRequest);
router.get("/:id", protect, getRequestById);
router.put("/:requestId/accept", protect, acceptRequest);
router.put("/:requestId/check-in", protect, checkIn);
router.put("/:requestId/check-out", protect, checkOut);
router.get("/professional/:professionalId", protect, getRequestsForProfessional);


module.exports = router;
