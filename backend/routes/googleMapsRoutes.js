const express = require("express");
const router = express.Router();
const { getDistance } = require("../config/googleMaps");

router.get("/distance", async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const distanceData = await getDistance(origin, destination);
    res.json(distanceData.rows[0].elements[0]);
  } catch (error) {
    res.status(500).json({ message: "Error calculating distance" });
  }
});

module.exports = router;
