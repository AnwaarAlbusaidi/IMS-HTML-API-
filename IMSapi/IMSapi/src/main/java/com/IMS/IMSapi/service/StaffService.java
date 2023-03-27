package com.IMS.IMSapi.service;

import com.IMS.IMSapi.model.Staff;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class StaffService {

    /**
     * Returns the list of all staff.
     *
     * @return the list of all staff
     */
    public List<Staff> getListOfStaff() {
        logger.info("Get all staff");
        return listOfStaff;
    }

    /**
     * Returns the teacher with the specified ID.
     *
     * @param id the ID of the teacher to retrieve
     * @return the teacher with the specified ID, or null if no teacher was found
     */
    public Staff getStaff(int id) {
        Optional<Staff> foundStaff = listOfStaff.stream().filter(
                (staff) -> {
                    return staff.id == id;
                }).findFirst();
        if (foundStaff.isPresent()) {

            logger.info("Get staff with id: " + id);
            return foundStaff.get();
        } else
            return null;
    }

    /**
     * Registers a new staff.
     *
     * @param staff the staff to register
     * @return the registered staff
     */
    public Staff registerStaff(Staff staff) {
        staff.id = this.currrentID++;
        listOfStaff.add(staff);
        logger.info("staff with id: " + staff.id + " created.");
        return staff;
    }

    /**
     * Updates the details of a teacher with the specified ID.
     *
     * @param id             the ID of the teacher to update
     * @param updatedStaff the updated details of the teacher
     * @return the updated teacher
     */
    public Staff updateStaff(int id, Staff updatedStaff) {
        Staff foundStaff = getStaff(id);
        foundStaff.name = updatedStaff.email;
        logger.info("teacher with id: " + updatedStaff.id + " updated.");
        return foundStaff;
    }
    public Staff deleteStaff(int id) {
        Staff foundStaff = getStaff(id);
        listOfStaff.remove(foundStaff);
        logger.info("teacher with id: " + foundStaff.id + " deleted.");
        return foundStaff;
    }

    /**
     * The list of staffs managed by this service.
     */
    List<Staff> listOfStaff = new CopyOnWriteArrayList<>();

    /**
     * The current ID to assign to the next registered staff.
     */
    int currrentID = 1;
    /**
     * This line creates a logger instance with the class name "StaffService" to log messages.The logger instance can
     *  be used to log messages of varying levels of severity, such as debug, info, warn, and error
     */
    private static final Logger logger = LoggerFactory.getLogger(StaffService.class);

}
