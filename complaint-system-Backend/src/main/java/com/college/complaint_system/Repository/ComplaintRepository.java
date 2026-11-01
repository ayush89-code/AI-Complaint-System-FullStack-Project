package com.college.complaint_system.Repository;

import com.college.complaint_system.Entity.Complaint;
import com.college.complaint_system.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStudent(Student student);
}

