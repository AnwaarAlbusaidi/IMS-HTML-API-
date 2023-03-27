package com.IMS.IMSapi.controller;

import com.IMS.IMSapi.model.Student;
import com.IMS.IMSapi.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/students")
/**
 This class represents the controller for managing the students of an institute.
 */
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class StudentController {
    @Autowired
    StudentService studentService;
    /**
     * Retrieves a list of all students.
     *
     * @return A List of Student objects representing all the students.
     */
    @GetMapping
    public List<Student> getAllStudent() {
        return studentService.getListOfStudent();
    }

    /**
     * Retrieves a specific student by their ID.
     *
     * @param id The ID of the student to retrieve.
     * @return A Student object representing the student with the given ID.
     */
    @GetMapping(path = "/{id}")
    public Student getAllStudent(@PathVariable(name = "id") int id) {
        return studentService.getStudent(id);
    }

    /**
     * Creates a new student.
     *
     * @param student The Student object representing the new student to be created.
     * @return A Student object representing the newly created student.
     */
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        studentService.registerStudent(student);
        return student;
    }

    /**
     * Updates an existing student's information.
     *
     * @param id             The ID of the student to be updated.
     * @param currentStudent The updated Student object with the new information.
     * @return A Student object representing the updated student.
     */
    @PutMapping(path = "/{id}")
    public Student updateStudent(@PathVariable(name = "id") int id, @RequestBody Student currentStudent) {
        Student updateStudent = studentService.getStudent(id);
        updateStudent.name = currentStudent.name;
        updateStudent.email = currentStudent.email;
        return updateStudent;
    }

    /**
     * Deletes an existing student.
     *
     * @param id The ID of the student to be deleted.
     * @return A Student object representing the deleted student.
     */
    @DeleteMapping(path = "/{id}")
    public Student deleteStudent(@PathVariable(name = "id") int id) {
        Student deletesStudent = studentService.getStudent(id);
        studentService.deleteStudent(id);
        return deletesStudent;
    }
}

