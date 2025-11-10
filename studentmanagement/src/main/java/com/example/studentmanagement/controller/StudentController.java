package com.example.studentmanagement.controller;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id){
      Student student  = studentService.getStudentById(id);
      if (student != null) {
          return ResponseEntity.ok(student);
      }
      return  ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student){
        Student saveStudent = studentService.saveStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveStudent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student){
        Student updateStudent = studentService.updateStudent(id, student);
        if (updateStudent != null) {
            return ResponseEntity.ok(updateStudent);
        }
        return ResponseEntity.notFound().build();

    }

//    @GetMapping("id")
//    public ResponseEntity<Student> getStudentById(@RequestParam Long id){
//        Student student  = studentService.getStudentById(id);
//        if (student != null) {
//            return ResponseEntity.ok(student);
//        }
//        return  ResponseEntity.notFound().build();
//    }
//
//    @GetMapping("id")
//    public ResponseEntity<Student> getStudentById(RequestBodyDto body){
//        Student student  = studentService.getStudentById();
//        if (student != null) {
//            return ResponseEntity.ok(student);
//        }
//        return  ResponseEntity.notFound().build();
//    }


}
