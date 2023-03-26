package com.finwise.implementations;

import com.finwise.models.*;
import com.finwise.models.Transactions;
import com.finwise.services.*;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionsServiceImpl implements TransactionsService {
    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    ExpenseBudgetService expenseBudgetService;

    @Autowired
    UserService userService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    TransactionTypeService transactionTypeService;

    public List<Transactions> getAllTransactions(int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        String sql = "SELECT * FROM transactions WHERE user_id = :user_id";
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(Transactions.class);
        query.setParameter("user_id", userId);
        List results = query.list();
        transaction.commit();
        session.close();
        return results;
    }

    public Transactions createTransactions(Transactions transactions,int userId,int tranTypeId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        User user = userService.getUserById(userId);
        transactions.setUser(user);
//        Category category = categoryService.getCategoryById()
//        transactions.setCategoryId(categoryId);
        TransactionType transactionType = transactionTypeService.getTransactionTypeById(tranTypeId);
        transactions.setTransactionType(transactionType);
        Transactions transactions1 = new Transactions();
        transactions1.setTransactionId(transactions.getTransactionId());
        transactions1.setUser(transactions.getUser());
        transactions1.setTransactionType(transactions.getTransactionType());
        transactions1.setTransactionMonth(transactions.getTransactionMonth());
        transactions1.setTransactionYear(transactions.getTransactionYear());
        transactions1.setDescription(transactions.getDescription());
        transactions1.setCategory(transactions.getCategory());
        if(tranTypeId == 1){
//            Category category = new Category();
//            category.setCategoryId(0);
//            category.setCategoryName("-");
//            category.setUserId(userId);
//            transactions1.setCategory(null);
            transactions1.setDebitAmount(0);
            transactions1.setCreditAmount(transactions.getCreditAmount());
        }else{

            transactions1.setCreditAmount(0);
            transactions1.setDebitAmount(transactions.getDebitAmount());
            String sql = "SELECT * FROM expense_budget WHERE category_id = :category_id";
            SQLQuery query = session.createSQLQuery(sql);
            query.addEntity(ExpenseBudget.class);
            query.setParameter("category_id", transactions.getCategory().getCategoryId());
            List<ExpenseBudget> results = (List<ExpenseBudget>) query.list();
            for(ExpenseBudget expenseBudget : results){
                ExpenseBudget newExpenseBudget = new ExpenseBudget();
                float spentAmount = expenseBudget.getSpentAmount();
                if(transactions.getTransactionMonth() == expenseBudget.getBudgetMonth()
                        && transactions.getTransactionYear() == expenseBudget.getBudgetYear()){
                    spentAmount = spentAmount + transactions.getDebitAmount();
                    expenseBudget.setSpentAmount(spentAmount);
                    newExpenseBudget= expenseBudgetService.updateExpenseBudget(expenseBudget,userId);
                    break;
                }
            }

        }
        session.save(transactions1);
        transaction.commit();
        session.close();
        return transactions1;
    }

    public Transactions updateTransactions(Transactions transactions,int userId,int tranTypeId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        User user = userService.getUserById(userId);
        transactions.setUser(user);
//        Category category = categoryService.getCategoryById()
//        transactions.setCategoryId(categoryId);
        TransactionType transactionType = transactionTypeService.getTransactionTypeById(tranTypeId);
        transactions.setTransactionType(transactionType);
        Transactions transactions1 = new Transactions();
        transactions1.setTransactionId(transactions.getTransactionId());
        transactions1.setUser(transactions.getUser());
        transactions1.setTransactionType(transactions.getTransactionType());
        transactions1.setTransactionMonth(transactions1.getTransactionMonth());
        transactions1.setTransactionYear(transactions.getTransactionYear());
        transactions1.setDescription(transactions.getDescription());
        transactions1.setCategory(transactions.getCategory());
        if(tranTypeId == 1){
//            Category category = new Category();
//            category.setCategoryId(0);
//            category.setCategoryName("-");
//            category.setUserId(userId);
//            transactions1.setCategory(null);
            transactions1.setDebitAmount(0);
            transactions1.setCreditAmount(transactions.getCreditAmount());
        }else{

            transactions1.setCreditAmount(0);
            transactions1.setDebitAmount(transactions.getDebitAmount());
            Transactions oldTransaction = new Transactions();
            oldTransaction = getTransactionsById(transactions.getTransactionId());
            String sql = "SELECT * FROM expense_budget WHERE category_id = :category_id";
            SQLQuery query = session.createSQLQuery(sql);
            query.addEntity(ExpenseBudget.class);
            query.setParameter("category_id", transactions.getCategory().getCategoryId());
            List<ExpenseBudget> results = (List<ExpenseBudget>) query.list();
            for(ExpenseBudget expenseBudget : results){
                ExpenseBudget newExpenseBudget = new ExpenseBudget();
                float spentAmount = expenseBudget.getSpentAmount();
                if(transactions.getTransactionMonth() == expenseBudget.getBudgetMonth()
                        && transactions.getTransactionYear() == expenseBudget.getBudgetYear()){
                    spentAmount = spentAmount + transactions.getDebitAmount() - oldTransaction.getDebitAmount();
                    expenseBudget.setSpentAmount(spentAmount);
                    newExpenseBudget= expenseBudgetService.updateExpenseBudget(expenseBudget,userId);
                    break;
                }
            }

        }
        session.saveOrUpdate(transactions1);
        transaction.commit();
        session.close();
        return transactions1;
    }

    public Transactions deleteTransactions(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Transactions transactions = session.get(Transactions.class,id);
        if(transactions.getTransactionType().getTransactionTypeId() == 1){
            transactions.setCategory(null);
            transactions.setDebitAmount(0);
        }else{
            String sql = "SELECT * FROM expense_budget WHERE category_id = :category_id";
            SQLQuery query = session.createSQLQuery(sql);
            query.addEntity(ExpenseBudget.class);
            query.setParameter("category_id", transactions.getCategory().getCategoryId());
            List<ExpenseBudget> results = (List<ExpenseBudget>) query.list();
            for(ExpenseBudget expenseBudget : results){
                ExpenseBudget newExpenseBudget = new ExpenseBudget();
                float spentAmount = expenseBudget.getSpentAmount();
                if(transactions.getTransactionMonth() == expenseBudget.getBudgetMonth()
                        && transactions.getTransactionYear() == expenseBudget.getBudgetYear()){
                    spentAmount = spentAmount - transactions.getDebitAmount();
                    expenseBudget.setSpentAmount(spentAmount);
                    newExpenseBudget= expenseBudgetService.updateExpenseBudget(expenseBudget,transactions.getUser().getUserId());
                    break;
                }
            }

        }
        session.delete(transactions);
        transaction.commit();
        session.close();
        return transactions;
    }

    public Transactions getTransactionsById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Transactions transactions = session.get(Transactions.class,id);
        transaction.commit();
        session.close();
        return transactions;
    }

    public List<Transactions> getTransactionOfPeriod(BudgetPeriod budgetPeriod,int userId) {
        List<Transactions> transactions = getAllTransactions(userId);
        List<Transactions> transactionsList = new ArrayList<Transactions>();
        for(Transactions transactions1: transactions){
            if(transactions1.getTransactionMonth() == budgetPeriod.getMonth() &&
                    transactions1.getTransactionYear() == budgetPeriod.getYear()){
                transactionsList.add(transactions1);
            }
        }
        return transactionsList;
    }
}
