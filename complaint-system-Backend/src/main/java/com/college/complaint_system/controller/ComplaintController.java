package com.college.complaint_system.controller;

import com.college.complaint_system.Entity.Complaint;
import com.college.complaint_system.Entity.Student;
import com.college.complaint_system.Repository.ComplaintRepository;
import com.college.complaint_system.Repository.StudentRepository;
import com.college.complaint_system.dto.ComplaintRequest;
import com.college.complaint_system.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
@CrossOrigin(
    origins = "http://localhost:5173",
    methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE }
)

public class ComplaintController {

    private final ComplaintService complaintService;
    private final StudentRepository studentRepository;
    private final ComplaintRepository complaintRepository;

    @PostMapping("/submit/{studentId}")
    public Complaint submitComplaint(
            @PathVariable Long studentId,
            @RequestBody ComplaintRequest request) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return complaintService.createComplaint(
                student,
                request.getDescription());
    }

    // -------- Student: View Own Complaints --------
    @GetMapping("/student/{studentId}")
    public List<Complaint> getComplaintsByStudent(@PathVariable Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return complaintRepository.findByStudent(student);
    }

    // -------- Admin: View All Complaints --------
    @GetMapping("/admin/all")
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // -------- Admin: Update Status --------
    @PutMapping("/admin/update-status/{complaintId}")
    public Complaint updateStatus(
            @PathVariable Long complaintId,
            @RequestParam String status) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(status);
        return complaintRepository.save(complaint);
    }

    // -------- Student/Admin: Delete Complaint --------
    @DeleteMapping("/delete/{complaintId}/student/{studentId}")
    public void deleteComplaint(
            @PathVariable Long complaintId,
            @PathVariable Long studentId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        if (!complaint.getStudent().getId().equals(studentId)) {
            throw new RuntimeException("Unauthorized delete attempt");
        }

        complaintRepository.delete(complaint);
    }

}
