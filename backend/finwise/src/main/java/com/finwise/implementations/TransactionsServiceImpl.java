package com.finwise.implementations;

import com.finwise.models.ExpenseBudget;
import com.finwise.models.Transactions;
import com.finwise.models.Transactions;
import com.finwise.services.ExpenseBudgetService;
import com.finwise.services.TransactionsService;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionsServiceImpl implements TransactionsService {
    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    ExpenseBudgetService expenseBudgetService;

//    @Autowired
//    UserService userService;

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
//        User user = userService.getUserById(userId);
        transactions.setUserId(userId);
//        transactions.setCategoryId(categoryId);
        transactions.setTransactionTypeId(tranTypeId);
//        transactions.setUser(user);
        if(tranTypeId == 1){
            transactions.setCategoryId(null);
            transactions.setDebitAmount(0);
        }else{
            String sql = "SELECT * FROM expense_budget WHERE category_id = :category_id";
            SQLQuery query = session.createSQLQuery(sql);
            query.addEntity(ExpenseBudget.class);
            query.setParameter("category_id", transactions.getCategoryId());
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
        session.save(transactions);
        transaction.commit();
        session.close();
        return transactions;
    }

    public Transactions updateTransactions(Transactions transactions,int userId,int tranTypeId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        transactions.setUserId(userId);
//        transactions.setCategoryId(categoryId);
        transactions.setTransactionTypeId(tranTypeId);
        if(tranTypeId == 1){
            transactions.setCategoryId(null);
            transactions.setDebitAmount(0);
        }else{
            Transactions oldTransaction = new Transactions();
            oldTransaction = getTransactionsById(transactions.getTransactionId());
            String sql = "SELECT * FROM expense_budget WHERE category_id = :category_id";
            SQLQuery query = session.createSQLQuery(sql);
            query.addEntity(ExpenseBudget.class);
            query.setParameter("category_id", transactions.getCategoryId());
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
        session.saveOrUpdate(transactions);
        transaction.commit();
        session.close();
        return transactions;
    }

    public Transactions deleteTransactions(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Transactions transactions = session.get(Transactions.class,id);
        if(transactions.getTransactionTypeId() == 1){
            transactions.setCategoryId(null);
            transactions.setDebitAmount(0);
        }else{
            String sql = "SELECT * FROM expense_budget WHERE category_id = :category_id";
            SQLQuery query = session.createSQLQuery(sql);
            query.addEntity(ExpenseBudget.class);
            query.setParameter("category_id", transactions.getCategoryId());
            List<ExpenseBudget> results = (List<ExpenseBudget>) query.list();
            for(ExpenseBudget expenseBudget : results){
                ExpenseBudget newExpenseBudget = new ExpenseBudget();
                float spentAmount = expenseBudget.getSpentAmount();
                if(transactions.getTransactionMonth() == expenseBudget.getBudgetMonth()
                        && transactions.getTransactionYear() == expenseBudget.getBudgetYear()){
                    spentAmount = spentAmount - transactions.getDebitAmount();
                    expenseBudget.setSpentAmount(spentAmount);
                    newExpenseBudget= expenseBudgetService.updateExpenseBudget(expenseBudget,transactions.getUserId());
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
}
