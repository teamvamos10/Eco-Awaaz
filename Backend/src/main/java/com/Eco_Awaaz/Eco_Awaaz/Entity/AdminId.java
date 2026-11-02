package com.Eco_Awaaz.Eco_Awaaz.Entity;

import java.io.Serializable;
import java.util.Objects;

public class AdminId implements Serializable {
    private String adminId;
    private String role;

    public AdminId() {}

    public AdminId(String adminId, String role) {
        this.adminId = adminId;
        this.role = role;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AdminId adminId1 = (AdminId) o;
        return Objects.equals(adminId, adminId1.adminId) && Objects.equals(role, adminId1.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(adminId, role);
    }
}
