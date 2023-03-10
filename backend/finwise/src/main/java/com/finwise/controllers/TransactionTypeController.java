package com.finwise.controllers;

import com.finwise.models.Category;
import com.finwise.models.TransactionType;
import com.finwise.services.TransactionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/trantype")
public class TransactionTypeController {
    @Autowired
    TransactionTypeService transactionTypeService;

    @GetMapping
    public List<TransactionType> getTranType(){
        return transactionTypeService.getAllTranType();
    }

    @GetMapping("/{id}")
    public TransactionType getTranTypeById(@PathVariable("id") int id){
        return transactionTypeService.getTransactionTypeById(id);
    }
}
