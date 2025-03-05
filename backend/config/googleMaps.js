const axios = require("axios");

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_BASE_URL = "https://maps.googleapis.com/maps/api";

const getGeocode = async (address) => {
  try {
    const response = await axios.get(`${GOOGLE_MAPS_BASE_URL}/geocode/json`, {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching geocode:", error.message);
    throw new Error("Failed to fetch geocode");
  }
};

const getDistance = async (origin, destination) => {
  try {
    const response = await axios.get(`${GOOGLE_MAPS_BASE_URL}/distancematrix/json`, {
      params: {
        origins: origin,
        destinations: destination,
        key: GOOGLE_MAPS_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching distance:", error.message);
    throw new Error("Failed to fetch distance");
  }
};

module.exports = { getGeocode, getDistance };
