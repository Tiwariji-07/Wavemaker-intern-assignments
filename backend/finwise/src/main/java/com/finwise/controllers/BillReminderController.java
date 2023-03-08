package com.finwise.controllers;

import com.finwise.models.Bill;
import com.finwise.services.BillReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "http://127.0.0.1:5500/")
@RequestMapping(value = "{user_id}/reminder")
public class BillReminderController {

    @Autowired
    BillReminderService billReminderService;

    @GetMapping
    public List<Bill> getBill(@PathVariable("user_id") int userId){
        return billReminderService.getAllReminders(userId);
    }

    @PostMapping("/create")
    public Bill createBill(@RequestBody Bill category,@PathVariable("user_id") int userId){
        return billReminderService.createBillReminder(category,userId);
    }

    @PutMapping("/update")
    public Bill updateBill(@RequestBody Bill category,@PathVariable("user_id") int userId){
        return billReminderService.updateBillReminder(category,userId);
    }

    @DeleteMapping("/{id}")
    public Bill deleteBill(@PathVariable("id") int id){
        return billReminderService.deleteBillReminder(id);
    }

    @GetMapping("/{id}")
    public Bill getBillById(@PathVariable("id") int id){
        return billReminderService.getBillReminderById(id);
    }

}
