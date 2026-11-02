package com.Eco_Awaaz.Eco_Awaaz.Controller;

import com.Eco_Awaaz.Eco_Awaaz.Entity.AdminEntity;
import com.Eco_Awaaz.Eco_Awaaz.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminEntity admin) {
        try {
            return ResponseEntity.ok(adminService.login(
                    admin.getAdminId(),
                    admin.getPassword(),
                    admin.getRole()
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        AdminEntity admin = AdminEntity.builder()
                .adminId(body.get("adminId"))
                .adminName(body.get("adminName"))
                .password(body.get("password"))
                .role(body.get("role"))
                .build();

        try {
            return ResponseEntity.ok(adminService.register(admin));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", ex.getMessage()));
        }
    }
}
