package com.outfit.recommendation.repository;

import com.outfit.recommendation.entity.Outfit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OutfitRepository extends JpaRepository<Outfit, Long> {

    List<Outfit> findByWeatherIgnoreCaseAndOccasionIgnoreCaseAndMinTemperatureLessThanEqualAndMaxTemperatureGreaterThanEqual(
            String weather, String occasion, double minTemp, double maxTemp);
}

