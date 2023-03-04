package com.finwise.services;

import com.finwise.models.Transactions;

import java.util.List;

public interface TransactionsService {
    List<Transactions> getAllTransactions(int userId);

    Transactions createTransactions(Transactions transactions,int userId);

    Transactions updateTransactions(Transactions transactions,int userId);

    Transactions deleteTransactions(int id);

    Transactions getTransactionsById(int id);
}
