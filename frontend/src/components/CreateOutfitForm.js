import React, { useState } from "react";
import { TextField, Button, Paper, Grid, Box, Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";

function CreateOutfitForm({ onSuccess }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [occasion, setOccasion] = useState("");
  const [minTemperature, setMinTemperature] = useState("");
  const [maxTemperature, setMaxTemperature] = useState("");
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOutfit = {
      category,
      description,
      occasion,
      minTemperature: parseFloat(minTemperature),
      maxTemperature: parseFloat(maxTemperature),
    };

    try {
      const res = await axios.post("http://localhost:8085/api/outfits", newOutfit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSnackbar({
        open: true,
        message: "Outfit created successfully!",
        severity: "success",
      });

      setCategory("");
      setDescription("");
      setOccasion("");
      setMinTemperature("");
      setMaxTemperature("");

      if (onSuccess) {
        onSuccess(); // Callback to refresh list if needed
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to create outfit!",
        severity: "error",
      });
    }
  };

  return (
    <>
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

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" gutterBottom>
            Add New Outfit
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Category"
                fullWidth
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Occasion"
                fullWidth
                required
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Min Temperature"
                type="number"
                fullWidth
                required
                value={minTemperature}
                onChange={(e) => setMinTemperature(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Max Temperature"
                type="number"
                fullWidth
                required
                value={maxTemperature}
                onChange={(e) => setMaxTemperature(e.target.value)}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Create Outfit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default CreateOutfitForm;
