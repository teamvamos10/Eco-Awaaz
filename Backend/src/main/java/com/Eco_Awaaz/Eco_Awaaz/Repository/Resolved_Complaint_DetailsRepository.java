package com.Eco_Awaaz.Eco_Awaaz.Repository;

import com.Eco_Awaaz.Eco_Awaaz.Entity.Resolved_Complaint_DetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface Resolved_Complaint_DetailsRepository extends JpaRepository<Resolved_Complaint_DetailsEntity, UUID> {
    List<Resolved_Complaint_DetailsEntity> findByResourceTypeIgnoreCase(String resourceType);
}
