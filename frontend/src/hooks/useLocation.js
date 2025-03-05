import { useState, useEffect } from "react";

const useLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError("Failed to retrieve location. Please enable location services.");
      }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return { location, error, fetchLocation };
};

export default useLocation;
