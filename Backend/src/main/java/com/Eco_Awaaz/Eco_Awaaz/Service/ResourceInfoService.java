package com.Eco_Awaaz.Eco_Awaaz.Service;

import com.Eco_Awaaz.Eco_Awaaz.Entity.ResourceInfoEntity;
import com.Eco_Awaaz.Eco_Awaaz.Repository.ResourceInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ResourceInfoService {

    @Autowired
    private ResourceInfoRepository repository;

    // 🔁 Add or Update
    public ResourceInfoEntity addOrUpdate(String type, String description) {

        ResourceInfoEntity resource = repository
                .findByResourceTypeIgnoreCase(type)
                .orElse(new ResourceInfoEntity());

        resource.setResourceType(type.toLowerCase());
        resource.setDescription(description);
        resource.setCreatedAt(LocalDateTime.now()); // Renew timestamp on update

        return repository.save(resource);
    }

    // 📥 Get by type
    public ResourceInfoEntity getByResourceType(String type) {

        ResourceInfoEntity resource = repository
                .findByResourceTypeIgnoreCase(type)
                .orElseGet(() -> emptyResource(type));

        if (resource.getCreatedAt() != null && resource.getCreatedAt().isBefore(LocalDateTime.now().minusHours(24))) {
            return emptyResource(type);
        }
        return resource;
    }

    public ResourceInfoEntity add(String type, String description) {

        ResourceInfoEntity resource = ResourceInfoEntity.builder()
                .resourceType(type.toLowerCase())
                .description(description)
                .createdAt(LocalDateTime.now())   // ✅ set time
                .build();

        return repository.save(resource);
    }

    // ✅ THIS IS YOUR METHOD (add here)
    public ResourceInfoEntity getLatest(String type) {

        Optional<ResourceInfoEntity> optional = repository
                .findTopByResourceTypeIgnoreCaseOrderByCreatedAtDesc(type);

        if (optional.isPresent()) {
            ResourceInfoEntity resource = optional.get();
            if (resource.getCreatedAt() != null && resource.getCreatedAt().isBefore(LocalDateTime.now().minusHours(24))) {
                return emptyResource(type);
            }
            return resource;
        }
        return emptyResource(type);
    }

    private ResourceInfoEntity emptyResource(String type) {
        return ResourceInfoEntity.builder()
                .resourceType(type.toLowerCase())
                .description("")
                .createdAt(LocalDateTime.now())
                .build();
    }
}
