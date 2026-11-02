package com.Eco_Awaaz.Eco_Awaaz.Controller;

import com.Eco_Awaaz.Eco_Awaaz.Entity.ResourceInfoEntity;
import com.Eco_Awaaz.Eco_Awaaz.Service.ResourceInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/resource")
public class ResourceInfoController {

    @Autowired
    private ResourceInfoService service;

    // ✅ ADD (creates NEW record with timestamp)
    @PostMapping("/add")
    public ResourceInfoEntity addResource(@RequestBody ResourceInfoEntity resource) {
        return service.add(
                resource.getResourceType(),
                resource.getDescription()
        );
    }

    // ✅ GET LATEST (based on date)
    @GetMapping("/{type}")
    public ResourceInfoEntity getResource(@PathVariable String type) {
        return service.getLatest(type);
    }
}