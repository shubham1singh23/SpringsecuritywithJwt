package com.shubham.StudentRecords.service;

import com.shubham.StudentRecords.model.Student;
import com.shubham.StudentRecords.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StudentService {

    @Autowired
    public StudentRepo repo;

    public List<Student> getStudents() {
       return repo.findAll();
    }

    public String add(Student s){
        repo.save(s);
        return "success";
    }

    public void updateStudent(Student s) {
        repo.save(s);
    }

    public void deleteStudent(int id) {
        repo.deleteById(id);
    }

    public List<Student> search(String keyword) {
       return repo.findByNameContaining(keyword);
    }
}
