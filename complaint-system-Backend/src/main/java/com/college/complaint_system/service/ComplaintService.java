package com.college.complaint_system.service;
import com.college.complaint_system.Entity.Complaint;
import com.college.complaint_system.Entity.Student;
import com.college.complaint_system.Repository.ComplaintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final AIService aiService;

    public Complaint createComplaint(Student student, String description) {

        // Clean extra quotes if present
        description = description.replaceAll("^\"|\"$", "");

        Complaint complaint = new Complaint();
        complaint.setStudent(student);
        complaint.setDescription(description);
        complaint.setDepartment(aiService.detectDepartment(description));
        complaint.setPriority(aiService.detectPriority(description));
        complaint.setStatus("Pending");
        complaint.setAiResponse(aiService.autoResponse(complaint.getDepartment()));
        complaint.setSeverityScore(aiService.calculateSeverity(description));
        
        if (complaint.getPriority().equals("High") &&complaint.getSeverityScore() > 5) {
            complaint.setStatus("Escalated");
        }else {
        complaint.setStatus("Pending");
        }
        
        complaint.setCreatedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }

}

