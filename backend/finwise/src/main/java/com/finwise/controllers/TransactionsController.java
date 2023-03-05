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

    @PostMapping("{tran_type_id}/create")
    public Transactions createTransactions(@RequestBody Transactions transactions,@PathVariable("user_id") int userId,
                                           @PathVariable("tran_type_id") int tranTypeId){
        return transactionsService.createTransactions(transactions,userId,tranTypeId);
    }

    @PutMapping("{tran_type_id}/update")
    public Transactions updateTransactions(@RequestBody Transactions transactions,@PathVariable("user_id") int userId,
                                           @PathVariable("tran_type_id") int tranTypeId){
        return transactionsService.updateTransactions(transactions,userId,tranTypeId);
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
