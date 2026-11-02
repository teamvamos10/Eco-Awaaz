package com.Eco_Awaaz.Eco_Awaaz.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.domain.Persistable;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "resolved_complaints_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resolved_Complaint_DetailsEntity implements Persistable<UUID> {

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

        @Override
        @Transient
        public boolean isNew() {
                return true;
        }
}
