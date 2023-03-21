package com.IMS.IMSapi.controller;

import com.IMS.IMSapi.model.Staff;
import com.IMS.IMSapi.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/teachers")
public class StaffController {
    @Autowired
    StaffService StaffService;

    /**
     * Returns a list of all staff in the system.
     */
    @GetMapping
    public List<Staff> getAllTeacher() {
        return StaffService.getListOfStaff();
    }

    @GetMapping(path = "/{id}")
    public Staff getTeacher(@PathVariable(name = "id") int id) {
        return StaffService.getStaff(id);
    }

    @PostMapping
    public Staff createTeacher(@RequestBody Staff teacher) {
        StaffService.registerStaff(teacher);
        return teacher;
    }

    @PutMapping(path = "/{id}")
    public Staff updateTeacher(@PathVariable(name = "id") int id, @RequestBody Staff currentTeacher) {
        Staff updateStaff = StaffService.getStaff(id);
        updateStaff.name = currentTeacher.name;
        updateStaff.email = currentTeacher.email;
        updateStaff.salary = currentTeacher.salary;
        return updateStaff;
    }

    @DeleteMapping(path = "/{id}")
    public Staff deleteStudent(@PathVariable(name = "id") int id) {
        Staff deletesTeacher = StaffService.getStaff(id);
        StaffService.deleteStaff(id);
        return deletesTeacher;
    }
}
