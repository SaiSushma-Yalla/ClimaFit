// src/pages/RecommendationPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import OutfitList from '../components/OutfitList';

const RecommendationPage = () => {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOutfits = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get('http://localhost:8085/api/recommend', {
        params: {
          occasion: "casual",
          weather: "cold",
          temperature: 15,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setOutfits(res.data);
    } catch (err) {
      console.error('Error fetching outfits:', err);
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Outfit Recommendations</h1>
      <button
        onClick={fetchOutfits}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Get Recommendations
      </button>

      {loading && <p className="text-blue-600 mt-2">Loading...</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      <div className="mt-4">
        <OutfitList outfits={outfits} />
      </div>
    </div>
  );
};

export default RecommendationPage;
