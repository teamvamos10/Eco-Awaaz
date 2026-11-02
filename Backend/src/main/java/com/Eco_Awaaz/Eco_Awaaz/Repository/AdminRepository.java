package com.Eco_Awaaz.Eco_Awaaz.Repository;

import com.Eco_Awaaz.Eco_Awaaz.Entity.AdminEntity;
import com.Eco_Awaaz.Eco_Awaaz.Entity.AdminId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, AdminId> {

    // 🔍 Find admin by ID and Role
    Optional<AdminEntity> findByAdminIdAndRole(String adminId, String role);

    // 🔐 For login
    Optional<AdminEntity> findByAdminIdAndPassword(String adminId, String password);

    Optional<AdminEntity> findByAdminIdAndPasswordAndRole(String adminId, String password, String role);
}
