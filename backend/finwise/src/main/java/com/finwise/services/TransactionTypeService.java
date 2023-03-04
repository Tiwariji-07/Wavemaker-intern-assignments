package com.finwise.services;

import com.finwise.models.Category;
import com.finwise.models.TransactionType;

import java.util.List;

public interface TransactionTypeService {

    List<TransactionType> getAllTranType();

    TransactionType getTransactionTypeById(int id);
}
