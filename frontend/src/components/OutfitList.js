// src/components/OutfitList.jsx
import React from 'react';
import PropTypes from 'prop-types';

const OutfitList = ({ outfits }) => {
  if (!outfits.length) return <p>No outfits found.</p>;

  return (
    <ul>
      {outfits.map((outfit) => (
        <li key={outfit.id} style={{ marginBottom: '10px' }}>
          <strong>{outfit.category}</strong> – {outfit.description} (
          {outfit.occasion}, {outfit.minTemperature}°C to {outfit.maxTemperature}°C)
        </li>
      ))}
    </ul>
  );
};

OutfitList.propTypes = {
  outfits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      occasion: PropTypes.string.isRequired,
      minTemperature: PropTypes.number.isRequired,
      maxTemperature: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default OutfitList;
