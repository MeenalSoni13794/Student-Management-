package com.example.studentmanagement.service;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Update an existing student (UPDATE)
    public Student updateStudent(Long id, Student updatedStudent) {
        // Step 1: Find the existing student in database
        Student existingStudent = studentRepository.findById(id).orElse(null);

        // Step 2: Check if student exists
        if (existingStudent == null) {
            throw new RuntimeException("Student not found with id: " + id);
        }

        // Step 3: Update the fields from the new data
        existingStudent.setName(updatedStudent.getName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setCourse(updatedStudent.getCourse());
        existingStudent.setAge(updatedStudent.getAge());

        // Step 4: Save the updated student back to database
        return studentRepository.save(existingStudent);
    }
}
