package com.finwise.services;

import com.finwise.models.BudgetPeriod;
import com.finwise.models.TransactionTable;
import com.finwise.models.Transactions;

import java.util.List;

public interface TransactionsService {
    List<Transactions> getAllTransactions(int userId);

    Transactions createTransactions(Transactions transactions,int userId,int tranTypeId);

    Transactions updateTransactions(Transactions transactions,int userId,int tranTypeId);

    Transactions deleteTransactions(int id);

    Transactions getTransactionsById(int id);

    List<Transactions> getTransactionOfPeriod(BudgetPeriod budgetPeriod,int userId);

    byte[] generate(TransactionTable transactionTable);
}
