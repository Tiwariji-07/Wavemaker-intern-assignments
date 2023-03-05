package com.finwise.implementations;

import com.finwise.models.ExpenseBudget;
import com.finwise.models.ExpenseBudget;
import com.finwise.services.ExpenseBudgetService;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseBudgetImpl implements ExpenseBudgetService {
    @Autowired
    private SessionFactory sessionFactory;

//    @Autowired
//    UserService userService;

    public List<ExpenseBudget> getAllExpenseBudget(int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        String sql = "SELECT * FROM expense_budget WHERE user_id = :user_id";
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(ExpenseBudget.class);
        query.setParameter("user_id", userId);
        List results = query.list();
        transaction.commit();
        session.close();
        return results;
    }

    public ExpenseBudget createExpenseBudget(ExpenseBudget expenseBudget,int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
//        User user = userService.getUserById(userId);
        expenseBudget.setUserId(userId);
//        expenseBudget.setUser(user);
        session.save(expenseBudget);
        transaction.commit();
        session.close();
        return expenseBudget;
    }

    public ExpenseBudget updateExpenseBudget(ExpenseBudget expenseBudget,int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        expenseBudget.setUserId(userId);
        session.saveOrUpdate(expenseBudget);
        transaction.commit();
        session.close();
        return expenseBudget;
    }

    public ExpenseBudget deleteExpenseBudget(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        ExpenseBudget expenseBudget = session.get(ExpenseBudget.class,id);
        session.delete(expenseBudget);
        transaction.commit();
        session.close();
        return expenseBudget;
    }

    public ExpenseBudget getExpenseBudgetById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        ExpenseBudget expenseBudget = session.get(ExpenseBudget.class,id);
        transaction.commit();
        session.close();
        return expenseBudget;
    }
}
