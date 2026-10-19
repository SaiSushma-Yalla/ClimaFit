
package com.outfit.recommendation.service;

import com.outfit.recommendation.entity.Outfit;
import com.outfit.recommendation.repository.OutfitRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {
    private final OutfitRepository outfitRepository;

    public RecommendationService(OutfitRepository outfitRepository) {
        this.outfitRepository = outfitRepository;
    }

    public List<Outfit> getRecommendations(String weather, String occasion, double temperature) {
        return outfitRepository.findByWeatherIgnoreCaseAndOccasionIgnoreCaseAndMinTemperatureLessThanEqualAndMaxTemperatureGreaterThanEqual(
                weather, occasion, temperature, temperature);
    }
}


