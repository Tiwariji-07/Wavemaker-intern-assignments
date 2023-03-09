package com.finwise.services;

import com.finwise.models.BudgetPeriod;
import com.finwise.models.ExpenseBudget;

import java.util.List;

public interface ExpenseBudgetService {

    List<ExpenseBudget> getAllExpenseBudget(int userId);

    ExpenseBudget createExpenseBudget(ExpenseBudget expenseBudget,int userId);

    ExpenseBudget updateExpenseBudget(ExpenseBudget expenseBudget,int userId);

    ExpenseBudget deleteExpenseBudget(int id);

    ExpenseBudget getExpenseBudgetById(int id);

    List<ExpenseBudget> getExpenseBudgetOfPeriod(BudgetPeriod budgetPeriod,int userId);

}
