package com.finwise.controllers;

import com.finwise.models.Transactions;
import com.finwise.services.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "{user_id}/transactions")
public class TransactionsController {
    @Autowired
    TransactionsService transactionsService;

    @GetMapping
    public List<Transactions> getTransactions(@PathVariable("user_id") int userId){
        return transactionsService.getAllTransactions(userId);
    }

    @PostMapping("/create")
    public Transactions createTransactions(@RequestBody Transactions transactions,@PathVariable("user_id") int userId){
        return transactionsService.createTransactions(transactions,userId);
    }

    @PutMapping("/update")
    public Transactions updateTransactions(@RequestBody Transactions transactions,@PathVariable("user_id") int userId){
        return transactionsService.updateTransactions(transactions,userId);
    }

    @DeleteMapping("/{id}")
    public Transactions deleteTransactions(@PathVariable("id") int id){
        return transactionsService.deleteTransactions(id);
    }

    @GetMapping("/{id}")
    public Transactions getTransactionsById(@PathVariable("id") int id){
        return transactionsService.getTransactionsById(id);
    }
}
