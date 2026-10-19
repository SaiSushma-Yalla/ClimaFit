import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import axios from "axios";

const RecommendationForm = () => {
  const [weather, setWeather] = useState("");
  const [occasion, setOccasion] = useState("");
  const [temperature, setTemperature] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8085/api/recommendations",
        {
          weather,
          occasion,
          temperature: parseFloat(temperature),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRecommendations(res.data);
      setSnackbar({
        open: true,
        message: `Found ${res.data.length} recommendation(s)!`,
        severity: "success",
      });
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setSnackbar({
        open: true,
        message: "Failed to fetch recommendations.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Get Outfit Recommendation
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Weather"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Temperature (°C)"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          type="number"
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Recommend
        </Button>
      </form>

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

      {recommendations.length > 0 && (
        <Box mt={4}>
          <Card variant="outlined" sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🎯 Top Recommendation:
              </Typography>
              <Typography>
                <strong>Category:</strong> {recommendations[0].category}
              </Typography>
              <Typography>
                <strong>Description:</strong> {recommendations[0].description}
              </Typography>
              <Typography>
                <strong>Occasion:</strong> {recommendations[0].occasion}
              </Typography>
              <Typography>
                <strong>Temp Range:</strong> {recommendations[0].minTemperature}°C - {recommendations[0].maxTemperature}°C
              </Typography>
            </CardContent>
          </Card>

          {recommendations.length > 1 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle1">📋 Other Matching Outfits:</Typography>
              <ul>
                {recommendations.slice(1).map((outfit) => (
                  <li key={outfit.id}>
                    <strong>{outfit.category}</strong> – {outfit.description} ({outfit.weather}, {outfit.occasion}, {outfit.minTemperature}°C to {outfit.maxTemperature}°C)
                  </li>
                ))}
              </ul>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RecommendationForm;
