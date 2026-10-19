package com.outfit.recommendation.entity;
import com.outfit.recommendation.entity.Outfit;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne  // or appropriate relationship annotation
    @JoinColumn(name = "outfit_id", nullable = false)
    private Outfit outfit;




    @Column(nullable = false)
    private String weather;

    @Column(nullable = false)
    private String occasion;


}

