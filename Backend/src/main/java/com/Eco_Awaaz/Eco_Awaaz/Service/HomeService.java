package com.Eco_Awaaz.Eco_Awaaz.Service;

import com.Eco_Awaaz.Eco_Awaaz.Entity.Complaint_DetailsEntity;
import com.Eco_Awaaz.Eco_Awaaz.Repository.Complaint_DetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HomeService {

    @Autowired
    private Complaint_DetailsRepository repository;

    public Map<String, Integer> getCountsByResource(String resourceType) {

        // ✅ Fetch only required data from DB
        List<Complaint_DetailsEntity> complaints =
                repository.findByResourceTypeIgnoreCase(resourceType);

        // ✅ Predefined categories (UI-friendly)
        Map<String, Integer> result = new LinkedHashMap<>();

        switch (resourceType.toUpperCase()) {

            case "WATER":
                result.put("No water supply", 0);
                result.put("Contaminated water", 0);
                result.put("Low water pressure", 0);
                result.put("Leaking pipe", 0);
                break;

            case "ELECTRICITY":
                result.put("No power supply", 0);
                result.put("Transformer or DC blast", 0);
                result.put("Street light not working", 0);
                result.put("Loose hanging wire", 0);
                break;

            case "WASTE":
                result.put("Garbage not collected", 0);
                result.put("Blocked or broken drainage", 0);
                result.put("Garbage dumped on roads", 0);
                result.put("Bad smell and disease risk", 0);
                break;

            default:
                throw new RuntimeException("Invalid resource type");
        }

        Map<String, Integer> normalized = new LinkedHashMap<>();

        for (String key : result.keySet()) {
            normalized.put(key.toLowerCase(), 0);
        }

        for (Complaint_DetailsEntity c : complaints) {

            if (c.getStatus() != null && "resolved".equalsIgnoreCase(c.getStatus().trim())) {
                continue;
            }

            String complaintType = c.getComplaintType();

            if (complaintType == null || complaintType.isBlank()) {
                continue;
            }

            String formatted = complaintType
                    .toLowerCase()
                    .replace("_", " ");

            normalized.put(formatted, normalized.getOrDefault(formatted, 0) + 1);
        }

        // Map back to linked hash map for final result, preserving order of predefined then any new ones
        Map<String, Integer> finalResult = new LinkedHashMap<>();
        for (String key : result.keySet()) {
            String lowerKey = key.toLowerCase();
            finalResult.put(key, normalized.getOrDefault(lowerKey, 0));
            normalized.remove(lowerKey);
        }
        for (Map.Entry<String, Integer> entry : normalized.entrySet()) {
            String key = entry.getKey();
            if (key.length() > 0) {
                key = Character.toUpperCase(key.charAt(0)) + key.substring(1);
            }
            finalResult.put(key, entry.getValue());
        }

        return finalResult;
    }
}
