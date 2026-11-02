package com.Eco_Awaaz.Eco_Awaaz.Service;

import com.Eco_Awaaz.Eco_Awaaz.Entity.AdminEntity;
import com.Eco_Awaaz.Eco_Awaaz.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // 🔐 Login logic
    public AdminEntity login(String adminId, String password) {
        return login(adminId, password, null);
    }

    public AdminEntity login(String adminId, String password, String role) {
        String normalizedRole = normalizeRole(role);
        String trimmedAdminId = adminId == null ? null : adminId.trim();

        if (normalizedRole != null) {
            // Check if admin exists for this ID and role
            Optional<AdminEntity> existingAdmin = adminRepository.findByAdminIdAndRole(trimmedAdminId, normalizedRole);
            if (existingAdmin.isEmpty()) {
                throw new RuntimeException("no admin");
            }

            // Check password
            AdminEntity admin = existingAdmin.get();
            if (!admin.getPassword().equals(password)) {
                throw new RuntimeException("Invalid password");
            }
            return admin;
        } else {
            // Fallback login if role is null (scan database)
            List<AdminEntity> allAdmins = adminRepository.findAll();
            Optional<AdminEntity> existingAdmin = allAdmins.stream()
                    .filter(a -> a.getAdminId().equalsIgnoreCase(trimmedAdminId))
                    .findFirst();

            if (existingAdmin.isEmpty()) {
                throw new RuntimeException("no admin");
            }

            AdminEntity admin = existingAdmin.get();
            if (!admin.getPassword().equals(password)) {
                throw new RuntimeException("Invalid password");
            }
            return admin;
        }
    }

    public AdminEntity register(AdminEntity admin) {

        if (admin.getAdminId() == null || admin.getAdminId().isEmpty()) {
            throw new RuntimeException("Admin ID is required");
        }

        if (admin.getPassword() == null || admin.getPassword().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        if (admin.getRole() == null || admin.getRole().isEmpty()) {
            throw new RuntimeException("Role is required");
        }

        String originalAdminId = admin.getAdminId().trim();
        String normalizedRole = normalizeRole(admin.getRole());

        // Check uniqueness for composite key (admin_id + role)
        if (adminRepository.findByAdminIdAndRole(originalAdminId, normalizedRole).isPresent()) {
            throw new RuntimeException("Admin ID already exists in this role");
        }

        admin.setRole(normalizedRole);
        admin.setAdminId(originalAdminId);

        return adminRepository.save(admin);
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) {
            return null;
        }

        return role.trim().toLowerCase();
    }
}
