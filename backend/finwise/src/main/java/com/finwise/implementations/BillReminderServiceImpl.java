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

import java.sql.Date;
import java.time.LocalDate;
import java.time.Month;
import java.time.YearMonth;
import java.util.ArrayList;
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
        String sql = "SELECT * FROM bill_reminder WHERE user_id = :user_id and is_active = true";
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
        bill.setActive(true);
        List<Bill> bills = getAllReminders(userId);
        boolean exists=false;
        for(Bill bill1: bills){
            if(bill1.isRecurring()){
                if(bill1.getBillName().equalsIgnoreCase(bill.getBillName())){
                    exists =true;
                    break;
                }
            }else if(bill1.getReminderDate().compareTo(bill.getReminderDate())==0){
                if(bill1.getBillName().equalsIgnoreCase(bill.getBillName())){
                    exists =true;
                    break;
                }
            }
        }
//        User user = userService.getUserById(userId);
//        bill.setUser(user);
        if(!exists){
            session.save(bill);
            transaction.commit();
            session.close();
            return bill;
        }else{
            Bill bill2=new Bill();
            return bill2;
        }


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

    public List<Bill> getRemindersByPeriod(BudgetPeriod budgetPeriod, int userId) {
        List<Bill> bills = getAllReminders(userId);
        List<Bill> billList = new ArrayList<Bill>();
//        YearMonth thisYearMonth = YearMonth.of(budgetPeriod.getYear(), budgetPeriod.getMonth());
        for(Bill bill1: bills){
            Date billDate = bill1.getReminderDate();
            LocalDate billDate1 =  billDate.toLocalDate();
            if(bill1.isRecurring() || (billDate1.getMonthValue() == budgetPeriod.getMonth() &&
                billDate1.getYear() == budgetPeriod.getYear())){
                billList.add(bill1);
            }
        }
        return billList;
    }
}
