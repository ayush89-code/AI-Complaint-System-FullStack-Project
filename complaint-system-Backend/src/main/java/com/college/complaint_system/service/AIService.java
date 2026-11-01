package com.college.complaint_system.service;

import org.springframework.stereotype.Service;

@Service
public class AIService {

    public String detectDepartment(String text) {
        text = text.toLowerCase();

        if (text.contains("exam") || text.contains("result") || text.contains("syllabus")) {
            return "Academic";
        }
        if (text.contains("hostel") || text.contains("room") || text.contains("mess")) {
            return "Hostel";
        }
        if (text.contains("teacher") || text.contains("faculty") || text.contains("professor")) {
            return "Faculty";
        }
        if (text.contains("water") || text.contains("electricity") || text.contains("broken")) {
            return "Infrastructure";
        }
        return "Administration";
    }

    public String detectPriority(String text) {
        text = text.toLowerCase();

        if (text.contains("urgent") || text.contains("harassment") || text.contains("danger")) {
            return "High";
        }
        if (text.contains("delay") || text.contains("not working")) {
            return "Medium";
        }
        return "Low";
    }

    public String autoResponse(String department) {
        return "Your complaint has been forwarded to the " + department + " department.";
    }

    //calculate ai score based on complaint 
    public int calculateSeverity(String text) {
    int score = 0;
    text = text.toLowerCase();

    if (text.contains("urgent")) score += 5;
    if (text.contains("not working")) score += 3;
    if (text.contains("as soon as")) score += 1;
    if (text.contains("harassment")) score += 7;
    if (text.contains("delay")) score += 2;

    return score;
}

}

