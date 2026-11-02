package com.Eco_Awaaz.Eco_Awaaz.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "complaints_detail")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint_DetailsEntity {

        @Id
        @Column(name = "id")
        private UUID id;

        @Column(name = "date")
        private Date date;

        @Column(name = "resource_type", nullable = false)
        private String resourceType;

        @Column(name = "postal_code", nullable = false)
        private String postalCode;

        @Column(name = "address")
        private String address;

        @Column(name = "complaint_type", nullable = false)
        private String complaintType;

        @Column(name = "status")
        private String status;
}