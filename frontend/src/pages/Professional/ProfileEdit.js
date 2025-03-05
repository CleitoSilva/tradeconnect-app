import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import "./Professional.css";

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    category: "",
    experience: "",
    region: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories] = useState([
    "Carpenter",
    "Electrician",
    "Plumber",
    "Locksmith",
    "Mason",
    "Painter",
  ]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/professionals/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(response.data);
      } catch (err) {
        setError("Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setProfile({
            ...profile,
            region: `${position.coords.latitude}, ${position.coords.longitude}`,
          });
        },
        () => setError("Failed to fetch location.")
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/professionals/profile", profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" required />
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" required />
        
        {/* Dropdown for Category */}
        <select name="category" value={profile.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <input type="text" name="experience" value={profile.experience} onChange={handleChange} placeholder="Experience" required />

        {/* Location Fetch Button */}
        <div className="location-input">
          <input type="text" name="region" value={profile.region} readOnly placeholder="Region (Lat, Long)" />
          <button type="button" onClick={handleLocation}>Get Location</button>
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
