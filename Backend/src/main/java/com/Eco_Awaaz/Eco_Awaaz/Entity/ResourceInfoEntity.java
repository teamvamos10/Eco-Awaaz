package com.Eco_Awaaz.Eco_Awaaz.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "resource_info")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "resource_type", nullable = false)
    private String resourceType;   // WATER / ELECTRICITY / WASTE

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(nullable = false)
    private LocalDateTime createdAt;
}