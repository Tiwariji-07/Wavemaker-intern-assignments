package com.finwise.implementations;

import com.finwise.models.Transactions;
import com.finwise.models.Transactions;
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
        session.saveOrUpdate(transactions);
        transaction.commit();
        session.close();
        return transactions;
    }

    public Transactions deleteTransactions(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Transactions transactions = session.get(Transactions.class,id);
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
