package com.shubham.StudentRecords.controller;

import com.shubham.StudentRecords.model.Student;
import java.util.*;

import com.shubham.StudentRecords.service.StudentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:5173")
public class StudentController {
    @Autowired
    private StudentService service;

    @GetMapping("csrf-token")
    public CsrfToken getCsrf(HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }

    @GetMapping("students")
    public List<Student> getStudents(){
        System.out.println("Get request");
        return service.getStudents();
    }

    @PostMapping("students")
    public String addStudent(@RequestBody Student s){
        System.out.println("add request");
        return service.add(s);
    }

    @PutMapping("students")
    public String updateStudent(@RequestBody Student s){
        service.updateStudent(s);
        return "Success";
    }

    @DeleteMapping("students/{rollno}")
    public String deleteStudent(@PathVariable int rollno){
        service.deleteStudent(rollno);
        return "Success";
    }

    @GetMapping("students/search/{keyword}")
    public List<Student> search(@PathVariable("keyword") String keyword){
       return service.search(keyword);
    }
}
