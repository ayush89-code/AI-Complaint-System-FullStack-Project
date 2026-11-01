package com.college.complaint_system.controller;

import com.college.complaint_system.Entity.Admin;
import com.college.complaint_system.Entity.Student;
import com.college.complaint_system.Repository.AdminRepository;
import com.college.complaint_system.Repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;

    // ---------------- STUDENT REGISTER ----------------
    @PostMapping("/student/register")
    public Student registerStudent(@RequestBody Student student) {

        studentRepository.findByEmail(student.getEmail())
                .ifPresent(s -> {
                    throw new RuntimeException("Email already registered");
                });

        return studentRepository.save(student);
    }

    // ---------------- STUDENT LOGIN ----------------
    @PostMapping("/student/login")
    public Student loginStudent(@RequestBody Student loginRequest) {

        Student student = studentRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return student;
    }

    // ---------------- ADMIN LOGIN ----------------
    @PostMapping("/admin/login")
    public Admin loginAdmin(@RequestBody Admin loginRequest) {

        Admin admin = adminRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return admin;
    }
}
