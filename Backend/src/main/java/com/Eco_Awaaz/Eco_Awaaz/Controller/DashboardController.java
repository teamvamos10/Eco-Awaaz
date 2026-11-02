package com.Eco_Awaaz.Eco_Awaaz.Controller;

import com.Eco_Awaaz.Eco_Awaaz.Entity.Resolved_Complaint_DetailsEntity;
import com.Eco_Awaaz.Eco_Awaaz.Service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // 💧 WATER
    @GetMapping("/water")
    public Map<String, Object> getWaterDashboard() {
        return dashboardService.getDashboardByResource("water");
    }

    @GetMapping("/waste")
    public Map<String, Object> getWasteDashboard() {
        return dashboardService.getDashboardByResource("waste");
    }

    @GetMapping("/electricity")
    public Map<String, Object> getElectricityDashboard() {
        return dashboardService.getDashboardByResource("electricity");
    }

    @PutMapping("/complaints/{id}/resolve")
    public Map<String, Object> resolveComplaint(@PathVariable java.util.UUID id) {
        dashboardService.resolveComplaint(id);
        return Map.of("success", true, "message", "Complaint resolved successfully");
    }

    @GetMapping("/{resourceType}/resolved")
    public List<Resolved_Complaint_DetailsEntity> getResolvedComplaints(@PathVariable String resourceType) {
        return dashboardService.getResolvedComplaints(resourceType);
    }
}