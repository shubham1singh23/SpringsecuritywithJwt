package com.shubham.StudentRecords.controller;

import com.shubham.StudentRecords.model.Student;
import java.util.*;

import com.shubham.StudentRecords.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:5173")
public class StudentController {
    @Autowired
    private StudentService service;

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
}
