package com.finwise.implementations;

import com.finwise.models.*;
import com.finwise.models.Bill;
import com.finwise.models.Bill;
import com.finwise.services.BillReminderService;
import com.finwise.services.UserService;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillReminderServiceImpl implements BillReminderService {

    @Autowired
    private SessionFactory sessionFactory;

//    @Autowired
//    UserService userService;

    public List<Bill> getAllReminders(int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        String sql = "SELECT * FROM bill_reminder WHERE user_id = :user_id";
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(Bill.class);
        query.setParameter("user_id", userId);
        List reminders = query.list();
        transaction.commit();
        session.close();
        return reminders;
    }

    public Bill createBillReminder(Bill bill, int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        bill.setUserId(userId);
//        User user = userService.getUserById(userId);
//        bill.setUser(user);
        session.save(bill);
        transaction.commit();
        session.close();
        return bill;
    }

    public Bill updateBillReminder(Bill bill,int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        bill.setUserId(userId);
        session.saveOrUpdate(bill);
        transaction.commit();
        session.close();
        return bill;
    }

    public Bill deleteBillReminder(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Bill bill = session.get(Bill.class,id);
        session.delete(bill);
        transaction.commit();
        session.close();
        return bill;
    }

    public Bill getBillReminderById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Bill bill = session.get(Bill.class,id);
        transaction.commit();
        session.close();
        return bill;
    }
}
