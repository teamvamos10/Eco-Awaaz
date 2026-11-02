////package com.Eco_Awaaz.Eco_Awaaz.Service;
////
////import com.Eco_Awaaz.Eco_Awaaz.Entity.Complaint_DetailsEntity;
////import com.Eco_Awaaz.Eco_Awaaz.Repository.Complaint_DetailsRepository;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.stereotype.Service;
////
////import java.util.*;
////
////@Service
////public class DashboardService {
////
////    @Autowired
////    private Complaint_DetailsRepository repository;
////
////    public Map<String, Object> getDashboardByResource(String resourceType) {
////
////        List<Complaint_DetailsEntity> complaints =
////                repository.findByResourceType(resourceType);
////
////        if (complaints.isEmpty()) {
////            throw new RuntimeException("No " + resourceType + " complaints found");
////        }
////
////        Map<String, Integer> countMap = new HashMap<>();
////
////        for (Complaint_DetailsEntity c : complaints) {
////            String postalCode = c.getPostalCode();
////
////            countMap.put(
////                    postalCode,
////                    countMap.getOrDefault(postalCode, 0) + 1
////            );
////        }
////
////        String topPostalCode = null;
////        int maxCount = 0;
////
////        for (Map.Entry<String, Integer> entry : countMap.entrySet()) {
////            if (entry.getValue() > maxCount) {
////                maxCount = entry.getValue();
////                topPostalCode = entry.getKey();
////            }
////        }
////
////        Map<String, Object> response = new HashMap<>();
////        response.put("postalCode", topPostalCode);
////        response.put("complaintCount", maxCount);
////        response.put("resourceType", resourceType);
////
////        return response;
////    }
////}
//package com.Eco_Awaaz.Eco_Awaaz.Service;
//
//import com.Eco_Awaaz.Eco_Awaaz.Entity.Complaint_DetailsEntity;
//import com.Eco_Awaaz.Eco_Awaaz.Repository.Complaint_DetailsRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.*;
//
//@Service
//public class DashboardService {
//
//    @Autowired
//    private Complaint_DetailsRepository complaintRepository;
//
//    // 🔥 Common method for all resource types
//    public Map<String, Object> getDashboardByResource(String resourceType) {
//
//        List<Complaint_DetailsEntity> list = complaintRepository.findAll();
//
//        Map<String, Integer> postalCount = new HashMap<>();
//        Map<String, Integer> typeCount = new HashMap<>();
//
//        for (Complaint_DetailsEntity c : list) {
//
//            if (resourceType.equalsIgnoreCase(c.getResourceType())) {
//
//                postalCount.put(
//                        c.getPostalCode(),
//                        postalCount.getOrDefault(c.getPostalCode(), 0) + 1
//                );
//
//                typeCount.put(
//                        c.getComplaintType(),
//                        typeCount.getOrDefault(c.getComplaintType(), 0) + 1
//                );
//            }
//        }
//
//        String topPostal = null;
//        int max = 0;
//
//        for (Map.Entry<String, Integer> entry : postalCount.entrySet()) {
//            if (entry.getValue() > max) {
//                max = entry.getValue();
//                topPostal = entry.getKey();
//            }
//        }
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("resourceType", resourceType);
//        response.put("topPostalCode", topPostal);
package com.Eco_Awaaz.Eco_Awaaz.Service;

import com.Eco_Awaaz.Eco_Awaaz.Entity.Complaint_DetailsEntity;
import com.Eco_Awaaz.Eco_Awaaz.Entity.Resolved_Complaint_DetailsEntity;
import com.Eco_Awaaz.Eco_Awaaz.Repository.Complaint_DetailsRepository;
import com.Eco_Awaaz.Eco_Awaaz.Repository.Resolved_Complaint_DetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class DashboardService {

    @Autowired
    private Complaint_DetailsRepository complaintRepository;

    @Autowired
    private Resolved_Complaint_DetailsRepository resolvedRepository;

    public Map<String, Object> getDashboardByResource(String resourceType) {

        // ✅ Fetch only required data
        List<Complaint_DetailsEntity> list =
                complaintRepository.findByResourceTypeIgnoreCase(resourceType);

        List<Complaint_DetailsEntity> pendingList = new ArrayList<>();
        for (Complaint_DetailsEntity c : list) {
            if (c.getStatus() == null || c.getStatus().isBlank() || "pending".equalsIgnoreCase(c.getStatus().trim())) {
                pendingList.add(c);
            }
        }

        Map<String, Integer> postalCount = new HashMap<>();
        Map<String, String> postalToAddress = new HashMap<>();
        Map<String, Integer> typeCount = new HashMap<>();
        Map<String, Map<String, Integer>> postalTypeCount = new HashMap<>();

        for (Complaint_DetailsEntity c : pendingList) {

            String postal = c.getPostalCode();
            String address = c.getAddress();
            String complaintType = c.getComplaintType();

            if (postal == null || postal.isBlank()) {
                continue;
            }

            // 📍 Count postal codes
            postalCount.put(
                    postal,
                    postalCount.getOrDefault(postal, 0) + 1
            );

            // 📍 Map postal → address
            postalToAddress.put(postal, address);

            // 📊 Normalize complaint type
            if (complaintType == null || complaintType.isBlank()) {
                continue;
            }

            String type = complaintType
                    .toLowerCase()
                    .replace("_", " ");

            typeCount.put(
                    type,
                    typeCount.getOrDefault(type, 0) + 1
            );

            Map<String, Integer> areaTypes = postalTypeCount.computeIfAbsent(postal, key -> new HashMap<>());
            areaTypes.put(type, areaTypes.getOrDefault(type, 0) + 1);
        }

        // 🔝 Find top postal code
        String topPostal = null;
        int max = 0;

        for (Map.Entry<String, Integer> entry : postalCount.entrySet()) {
            if (entry.getValue() > max) {
                max = entry.getValue();
                topPostal = entry.getKey();
            }
        }

        // 📍 Get address of top postal
        String topAddress = postalToAddress.get(topPostal);

        List<Map<String, Object>> areas = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : postalCount.entrySet()) {
            String postal = entry.getKey();
            Map<String, Object> area = new HashMap<>();
            area.put("postalCode", postal);
            area.put("address", postalToAddress.get(postal));
            area.put("totalComplaints", entry.getValue());
            area.put("complaintTypes", postalTypeCount.getOrDefault(postal, Map.of()));
            areas.add(area);
        }

        areas.sort((a, b) -> Integer.compare(
                (Integer) b.get("totalComplaints"),
                (Integer) a.get("totalComplaints")
        ));

        // 📦 Final response
        Map<String, Object> response = new HashMap<>();
        response.put("resourceType", resourceType);
        response.put("topPostalCode", topPostal);
        response.put("topAddress", topAddress);   // 🔥 ADDED
        response.put("totalComplaints", max);
        response.put("complaintTypes", typeCount);
        response.put("areas", areas);
        response.put("complaints", pendingList);   // 🔥 ADDED

        return response;
    }

    @Transactional
    public void resolveComplaint(UUID id) {
        Complaint_DetailsEntity complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        Resolved_Complaint_DetailsEntity resolved = Resolved_Complaint_DetailsEntity.builder()
                .id(complaint.getId())
                .date(complaint.getDate())
                .resourceType(complaint.getResourceType())
                .postalCode(complaint.getPostalCode())
                .address(complaint.getAddress())
                .complaintType(complaint.getComplaintType())
                .status("resolved")
                .build();

        resolvedRepository.save(resolved);
        complaintRepository.delete(complaint);
    }

    public List<Resolved_Complaint_DetailsEntity> getResolvedComplaints(String resourceType) {
        return resolvedRepository.findByResourceTypeIgnoreCase(resourceType);
    }
}
