package com.Eco_Awaaz.Eco_Awaaz.Controller;

import com.Eco_Awaaz.Eco_Awaaz.Service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    private HomeService homeService;

    // 💧 WATER
    @GetMapping("/water")
    public Map<String, Integer> getWaterData() {
        return homeService.getCountsByResource("WATER");
    }

    // ⚡ ELECTRICITY
    @GetMapping("/electricity")
    public Map<String, Integer> getElectricityData() {
        return homeService.getCountsByResource("ELECTRICITY");
    }

    // 🗑 WASTE
    @GetMapping("/waste")
    public Map<String, Integer> getWasteData() {
        return homeService.getCountsByResource("WASTE");
    }
}