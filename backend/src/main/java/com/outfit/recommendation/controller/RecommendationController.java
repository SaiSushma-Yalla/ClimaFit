package com.outfit.recommendation.controller;
import com.outfit.recommendation.entity.Outfit;
import com.outfit.recommendation.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.outfit.recommendation.dto.RecommendationRequest;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/recommendations")
    public List<Outfit> getRecommendations(@RequestParam String weather,
                                           @RequestParam String occasion,
                                           @RequestParam(required = false) Double temperature) {
        return recommendationService.getRecommendations(weather, occasion, temperature);
    }
    @PostMapping("/recommendations")
    public ResponseEntity<List<Outfit>> getRecommendations(@RequestBody RecommendationRequest request) {
        List<Outfit> outfits = recommendationService.getRecommendations(
                request.getWeather(),
                request.getOccasion(),
                request.getTemperature()
        );
        return ResponseEntity.ok(outfits);
    }
}


