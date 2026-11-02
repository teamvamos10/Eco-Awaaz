package com.Eco_Awaaz.Eco_Awaaz.Entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "admins")
@IdClass(AdminId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminEntity
{

        @Id
        @Column(name = "admin_id", nullable = false)
        private String adminId;  // manually entered (e.g., ADM001)

        @Column(name = "admin_name", nullable = false)
        private String adminName;

        @Column(nullable = false)
        private String password;

        @Id
        @Column(nullable = false)
        private String role;  // admin, water, electric, waste (normalized to lowercase)
    }

