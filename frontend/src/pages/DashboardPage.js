import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import {
  Button,
  Snackbar,
  Alert
} from "@mui/material";

const Dashboard = () => {
  const [outfits, setOutfits] = useState([]);
  const [newOutfit, setNewOutfit] = useState({
    category: "",
    description: "",
    minTemperature: "",
    maxTemperature: "",
    occasion: "",
  });

  const [recommendationInput, setRecommendationInput] = useState({
    weather: "",
    occasion: "",
    temperature: ""
  });

  const [recommendedOutfit, setRecommendedOutfit] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();
  const userRole = getUserRole();

  const fetchOutfits = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8085/api/outfits", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOutfits(res.data);
    } catch (error) {
      console.error("Failed to fetch outfits", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchOutfits();
  }, []);

  const handleNewOutfitChange = (e) => {
    setNewOutfit({ ...newOutfit, [e.target.name]: e.target.value });
  };

  const handleCreateOutfit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8085/api/outfits", newOutfit, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSnackbar({
        open: true,
        message: "Outfit created successfully!",
        severity: "success",
      });
      setNewOutfit({
        category: "",
        description: "",
        minTemperature: "",
        maxTemperature: "",
        occasion: ""
      });
      fetchOutfits();
    } catch (error) {
      console.error("Error creating outfit", error);
      setSnackbar({
        open: true,
        message: "Error creating outfit. Please check inputs or login.",
        severity: "error",
      });
    }
  };

  const handleRecommendationInputChange = (e) => {
    setRecommendationInput({ ...recommendationInput, [e.target.name]: e.target.value });
  };

  const handleRecommend = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8085/api/recommendations", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          weather: recommendationInput.weather,
          occasion: recommendationInput.occasion,
          temperature: parseFloat(recommendationInput.temperature),
        }
      });
      setRecommendedOutfit(res.data);
    } catch (error) {
      setRecommendedOutfit(null);
      alert("No recommendation found.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSnackbar({
      open: true,
      message: "Logged out successfully!",
      severity: "success",
    });
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome to Dashboard</h2>

      {userRole === "ADMIN" && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "2rem" }}>
          <h3>👔 Admin - Create New Outfit</h3>
          <form onSubmit={handleCreateOutfit}>
            <input
              name="category"
              placeholder="Category"
              value={newOutfit.category}
              onChange={handleNewOutfitChange}
              required
            />
            <br />
            <input
              name="description"
              placeholder="Description"
              value={newOutfit.description}
              onChange={handleNewOutfitChange}
              required
            />
            <br />
            <input
              name="minTemperature"
              type="number"
              placeholder="Min Temp (°C)"
              value={newOutfit.minTemperature}
              onChange={handleNewOutfitChange}
              required
            />
            <br />
            <input
              name="maxTemperature"
              type="number"
              placeholder="Max Temp (°C)"
              value={newOutfit.maxTemperature}
              onChange={handleNewOutfitChange}
              required
            />
            <br />
            <input
              name="occasion"
              placeholder="Occasion"
              value={newOutfit.occasion}
              onChange={handleNewOutfitChange}
              required
            />
            <br />
            <button type="submit">Create Outfit</button>
          </form>
        </div>
      )}

      <h3>Available Outfits</h3>
      <ul>
        {outfits.map((outfit) => (
          <li key={outfit.id}>
            <strong>{outfit.category}</strong> – {outfit.description} (
            {outfit.occasion}, {outfit.minTemperature}°C to {outfit.maxTemperature}°C)
          </li>
        ))}
      </ul>

      <h3>Get Outfit Recommendation</h3>
      <form onSubmit={handleRecommend}>
        <input
          name="weather"
          placeholder="Weather"
          value={recommendationInput.weather}
          onChange={handleRecommendationInputChange}
          required
        />
        <input
          name="occasion"
          placeholder="Occasion"
          value={recommendationInput.occasion}
          onChange={handleRecommendationInputChange}
          required
        />
        <input
          name="temperature"
          type="number"
          placeholder="Temperature (°C)"
          value={recommendationInput.temperature}
          onChange={handleRecommendationInputChange}
          required
        />
        <button type="submit">Recommend</button>
      </form>

      {recommendedOutfit && (
        <div style={{ marginTop: "20px", border: "1px solid gray", padding: "10px" }}>
          <h4>Recommended Outfit:</h4>
          <p><strong>Category:</strong> {recommendedOutfit.category}</p>
          <p><strong>Description:</strong> {recommendedOutfit.description}</p>
          <p><strong>Occasion:</strong> {recommendedOutfit.occasion}</p>
          <p><strong>Temp Range:</strong> {recommendedOutfit.minTemperature}°C - {recommendedOutfit.maxTemperature}°C</p>
        </div>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        style={{ marginTop: "20px" }}
      >
        Logout
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;
