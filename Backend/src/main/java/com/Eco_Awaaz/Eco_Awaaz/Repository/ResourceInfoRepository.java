package com.Eco_Awaaz.Eco_Awaaz.Repository;

import com.Eco_Awaaz.Eco_Awaaz.Entity.ResourceInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResourceInfoRepository extends JpaRepository<ResourceInfoEntity, Long> {

    Optional<ResourceInfoEntity> findByResourceType(String resourceType);
    Optional<ResourceInfoEntity> findByResourceTypeIgnoreCase(String resourceType);

    Optional<ResourceInfoEntity> findTopByResourceTypeIgnoreCaseOrderByCreatedAtDesc(String resourceType);

}