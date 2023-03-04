package com.finwise.implementations;

import com.finwise.models.TransactionType;
import com.finwise.models.TransactionType;
import com.finwise.services.TransactionTypeService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionTypeServiceImpl implements TransactionTypeService {
    @Autowired
    private SessionFactory sessionFactory;

    public List<TransactionType> getAllTranType() {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        List<TransactionType> transactionTypeList=session.createQuery("from TransactionType",TransactionType.class).list();
        transaction.commit();
        session.close();
        return transactionTypeList;
    }

    public TransactionType getTransactionTypeById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        TransactionType transactionType = session.get(TransactionType.class,id);
        transaction.commit();
        session.close();
        return transactionType;
    }
}
