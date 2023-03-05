package com.finwise.controllers;

import com.finwise.models.ExpenseBudget;
import com.finwise.services.ExpenseBudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "{user_id}/budget")
public class ExpenseBudgetController {

    @Autowired
    ExpenseBudgetService expenseBudgetService;

    @GetMapping
    public List<ExpenseBudget> getExpenseBudget(@PathVariable("user_id") int userId){
        return expenseBudgetService.getAllExpenseBudget(userId);
    }

    @PostMapping("/create")
    public ExpenseBudget createExpenseBudget(@RequestBody ExpenseBudget transactions,
                                             @PathVariable("user_id") int userId){
        return expenseBudgetService.createExpenseBudget(transactions,userId);
    }

    @PutMapping("/update")
    public ExpenseBudget updateExpenseBudget(@RequestBody ExpenseBudget transactions,
                                             @PathVariable("user_id") int userId){
        return expenseBudgetService.updateExpenseBudget(transactions,userId);
    }

    @DeleteMapping("/{id}")
    public ExpenseBudget deleteExpenseBudget(@PathVariable("id") int id){
        return expenseBudgetService.deleteExpenseBudget(id);
    }

    @GetMapping("/{id}")
    public ExpenseBudget getExpenseBudgetById(@PathVariable("id") int id){
        return expenseBudgetService.getExpenseBudgetById(id);
    }
}
