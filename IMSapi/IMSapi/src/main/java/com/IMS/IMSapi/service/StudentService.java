package com.IMS.IMSapi.service;

import com.IMS.IMSapi.model.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * This class represents the service for managing the students of an institute.
 */
@Service
public class StudentService {
    /**
     * Retrieves a list of all students.
     *
     * @return A List of Student objects representing all the students.
     */
    public List<Student> getListOfStudent() {
        logger.info("Getting all student");
        return listOfStudent;
    }

    /**
     * Retrieves a specific student by their ID.
     *
     * @param id The ID of the student to retrieve.
     * @return A Student object representing the student with the given ID, or null if no student was found.
     */
    public Student getStudent(int id) {
        Optional<Student> foundStudent = listOfStudent.stream().filter(
                (student) -> {
                    return student.id == id;
                }).findFirst();

        if (foundStudent.isPresent()) {
            logger.info("Get student with id: " + id);
            return foundStudent.get();
        } else
            return null;
    }

    /**
     * Registers a new student.
     *
     * @param student The Student object representing the new student to be registered.
     * @return A Student object representing the newly registered student.
     */
    public Student registerStudent(Student student) {
        student.id = this.currrentID++;
        listOfStudent.add(student);
        logger.info("Created student with id: " + student.id);
        return student;
    }

    /**
     * Updates an existing student's information.
     *
     * @param id             The ID of the student to be updated.
     * @param updatedStudent The updated Student object with the new information.
     * @return A Student object representing the updated student.
     */
    public Student updateStudent(int id, Student updatedStudent) {
        Student foundStudent = getStudent(id);
        foundStudent.name = updatedStudent.name;
        foundStudent.email = updatedStudent.email;
        logger.info("Student with id: " + updatedStudent.id + "updated");
        return foundStudent;
    }

    /**
     * Deletes an existing student.
     *
     * @param id The ID of the student to be deleted.
     * @return A Student object representing the deleted student.
     */
    public Student deleteStudent(int id) {
        Student foundStudent = getStudent(id);
        listOfStudent.remove(foundStudent);
        logger.info("Student with id: " + foundStudent.id + " deleted");
        return foundStudent;
    }

    /**
     * The list of student managed by this service.
     */
    public List<Student> listOfStudent = new CopyOnWriteArrayList<>();
    /**
     * The current ID to assign to the next registered student.
     */
    private int currrentID = 1;
    /**
     * This line creates a logger instance with the class name "TeacherService" to log messages.The logger instance can
     *  be used to log messages of varying levels of severity, such as debug, info, warn, and error
     */
    private static final Logger logger = LoggerFactory.getLogger(StudentService.class);
}
