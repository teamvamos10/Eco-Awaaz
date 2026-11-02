package com.Eco_Awaaz.Eco_Awaaz.Repository;

import com.Eco_Awaaz.Eco_Awaaz.Entity.Complaint_DetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface Complaint_DetailsRepository extends JpaRepository<Complaint_DetailsEntity, UUID> {

    // ✔ valid fields based on your table
    List<Complaint_DetailsEntity> findByStatus(String status);

    List<Complaint_DetailsEntity> findByResourceType(String resourceType);

    List<Complaint_DetailsEntity> findByPostalCode(String postalCode);

    List<Complaint_DetailsEntity> findByResourceTypeAndStatus(String resourceType, String status);
    List<Complaint_DetailsEntity> findByResourceTypeIgnoreCase(String resourceType);
}