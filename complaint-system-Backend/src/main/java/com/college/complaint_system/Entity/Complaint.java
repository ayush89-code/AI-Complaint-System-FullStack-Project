package com.college.complaint_system.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private String department;   // AI predicted
    private String priority;     // AI predicted
    private String status;       // Pending / In Progress / Resolved
    private String aiResponse;
    private int severityScore;
    private LocalDateTime createdAt;
}

