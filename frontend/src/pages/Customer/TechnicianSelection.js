import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig"; // Ensure axios is configured correctly
import "./Customer.css";

const GOOGLE_MAPS_API_KEY = "AIzaSyBPCzoy32Yxq_moGDnKkb_j683J6EZnrTc";

const TechnicianSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, problemDescription, urgency, dateTime } = location.state || {};

  const [professionals, setProfessionals] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const locationRequestInProgress = useRef(false);

  /** Get customer location */
  const getLocation = async () => {
    if (locationRequestInProgress.current || customerLocation) return;
    locationRequestInProgress.current = true;

    try {
      const permission = await navigator.permissions.query({ name: "geolocation" });

      if (permission.state === "denied") {
        alert("Please allow location access in your browser settings.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCustomerLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          if (error.code === 1) {
            alert("Please allow location access in your browser settings.");
          } else {
            setTimeout(getLocation, 3000);
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } finally {
      locationRequestInProgress.current = false;
    }
  };

  /** Fetch customer location on page load */
  useEffect(() => {
    getLocation();
  }, []);

  /** Fetch professionals based on category */
  useEffect(() => {
    if (!category) return;

    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(`/professionals?category=${category}`);
        setProfessionals(response.data);
      } catch (error) {
        console.error("❌ Error fetching professionals:", error.response?.data || error.message);
      }
    };

    fetchProfessionals();
  }, [category]);

  /** Fetch distance when a technician is selected */
  useEffect(() => {
    if (!customerLocation || !selectedTechnician) return;

    const selectedPro = professionals.find((pro) => pro._id === selectedTechnician);
    if (!selectedPro || !selectedPro.location?.coordinates) return;

    const [longitude, latitude] = selectedPro.location.coordinates;

    axios
      .get(`/distance?origin=${customerLocation.lat},${customerLocation.lng}&destination=${latitude},${longitude}`)
      .then((res) => setDistance(res.data.distance.text))
      .catch((err) => console.error("❌ Error fetching distance:", err.response?.data || err.message));
  }, [customerLocation, selectedTechnician, professionals]);

  /** Handle selection of a technician */
  const handleTechnicianSelection = (technicianId) => {
    console.log("Selected Technician:", technicianId);
    setSelectedTechnician(technicianId);

    // Store the selected technician's ID in localStorage for use in RequestsManagement.js
    localStorage.setItem("selectedTechnicianId", technicianId);
  };

  /** Handle request submission */
  const handleSubmit = async () => {
    if (!selectedTechnician) {
      alert("Please select a professional before submitting.");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in first.");
      navigate("/customer/login");
      return;
    }
  
    const requestData = {
      professionalId: selectedTechnician,
      category,
      problemDescription,
      urgency,
      dateTime,
      location: customerLocation,
    };
  
    try {
      const response = await axios.post("/requests", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const requestId = response.data?._id;
      if (!requestId) throw new Error("Request ID is missing.");
  
      // ✅ Save request state in localStorage
      localStorage.setItem("lastRequestId", requestId);
      localStorage.setItem("lastRequestStatus", "Pending");
  
      navigate("/customer/request-confirmation", {
        state: { requestId, category, problemDescription, selectedTechnician },
      });
    } catch (error) {
      console.error("❌ Error Sending Request:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to send request.");
    }
  };
  

  return (
    <div className="form-container">
      <h2>Select a Professional</h2>
      <ul className="technician-list">
        {professionals.map((pro) => (
          <li
            key={pro._id}
            className={selectedTechnician === pro._id ? "selected" : ""}
            onClick={() => handleTechnicianSelection(pro._id)}
          >
            <strong>{pro.name}</strong> - {pro.experience} years experience
          </li>
        ))}
      </ul>

      {selectedTechnician && customerLocation && (
        <div>
          <h3>Professional's Location</h3>
          <div className="map-container">
            {(() => {
              const selectedPro = professionals.find((pro) => pro._id === selectedTechnician);
              if (!selectedPro || !selectedPro.location?.coordinates) {
                return <p>Location data fetched successfully.</p>;
              }
              const [longitude, latitude] = selectedPro.location.coordinates;
              return (
                <iframe
                  title={`Map of ${selectedPro.name || "Professional"}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}&zoom=14`}
                  allowFullScreen
                />
              );
            })()}
          </div>
          {distance && <p>The professional is {distance} away.</p>}
        </div>
      )}

      <button onClick={handleSubmit} disabled={!selectedTechnician}>
        Send Request
      </button>
    </div>
  );
};

export default TechnicianSelection;
