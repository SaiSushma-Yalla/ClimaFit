package com.outfit.recommendation.controller;

import com.outfit.recommendation.entity.Outfit;
import com.outfit.recommendation.repository.OutfitRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outfits")
@CrossOrigin(origins = "*")
public class OutfitController {

    private final OutfitRepository outfitRepository;

    public OutfitController(OutfitRepository outfitRepository) {
        this.outfitRepository = outfitRepository;
    }

    @GetMapping
    public ResponseEntity<List<Outfit>> getAllOutfits() {
        return ResponseEntity.ok(outfitRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Outfit> saveOutfit(@RequestBody Outfit outfit) {
        return ResponseEntity.ok(outfitRepository.save(outfit));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Outfit> getById(@PathVariable Long id) {
        return outfitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
