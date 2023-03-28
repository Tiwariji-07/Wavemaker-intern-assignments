package com.finwise.implementations;

import com.finwise.models.BudgetPeriod;
import com.finwise.models.ExpenseBudget;
import com.finwise.models.ExpenseBudget;
import com.finwise.services.ExpenseBudgetService;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
//        List<ExpenseBudget> expenseBudgets = getAllExpenseBudget(userId);
//        boolean flag=false;
//        ExpenseBudget expenseBudget2 = new ExpenseBudget();
//        for(ExpenseBudget expenseBudget1:expenseBudgets){
////            if((expenseBudget.isRecurring() || (expenseBudget1.getBudgetMonth() == expenseBudget.getBudgetMonth() &&
////                expenseBudget1.getBudgetYear() == expenseBudget.getBudgetYear())) &&
////                expenseBudget1.getCategory().getCategoryId() == expenseBudget.getCategory().getCategoryId()){
////                float budgetAmount = expenseBudget1.getBudgetAmount();
////                expenseBudget1.setBudgetAmount(budgetAmount + expenseBudget.getBudgetAmount());
////                expenseBudget1.setRecurring(expenseBudget.isRecurring());
////                flag = true;
////                session.saveOrUpdate(expenseBudget1);
////            }
//            if(expenseBudget1.getBudgetMonth() == expenseBudget.getBudgetMonth() &&
//                    expenseBudget1.getBudgetYear() == expenseBudget.getBudgetYear() &&
//                    expenseBudget1.getCategory().getCategoryId() == expenseBudget.getCategory().getCategoryId()){
//                float budgetAmount = expenseBudget1.getBudgetAmount();
//                expenseBudget1.setBudgetAmount(budgetAmount + expenseBudget.getBudgetAmount());
//                expenseBudget1.setRecurring(expenseBudget.isRecurring());
//                flag = true;
//                session.saveOrUpdate(expenseBudget1);
//            }
//        }
//        if(!flag){
            session.save(expenseBudget);
////            return expenseBudget;
//        }
////        expenseBudget.setUser(user);
        transaction.commit();
        session.close();
        return expenseBudget;
    }

    public ExpenseBudget updateExpenseBudget(ExpenseBudget expenseBudget,int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        ExpenseBudget expenseBudget1 = getExpenseBudgetById(expenseBudget.getExpenseBudgetId());
        expenseBudget1.setCategory(expenseBudget.getCategory());
        expenseBudget1.setBudgetAmount(expenseBudget.getBudgetAmount());
        expenseBudget.setUserId(userId);
        session.saveOrUpdate(expenseBudget1);
        transaction.commit();
        session.close();
        return expenseBudget1;
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

    public List<ExpenseBudget> getExpenseBudgetOfPeriod(BudgetPeriod budgetPeriod, int userId) {
        List<ExpenseBudget> expenseBudgets = getAllExpenseBudget(userId);
        List<ExpenseBudget> expenseBudgets1 = new ArrayList<ExpenseBudget>();
        for(ExpenseBudget expenseBudget : expenseBudgets){
//            if(expenseBudget.isRecurring() || (expenseBudget.getBudgetMonth() == budgetPeriod.getMonth() &&
//            expenseBudget.getBudgetYear() == budgetPeriod.getYear())){
//                expenseBudgets1.add(expenseBudget);
//            }
            if(expenseBudget.getBudgetMonth() == budgetPeriod.getMonth() &&
                    expenseBudget.getBudgetYear() == budgetPeriod.getYear()){
                expenseBudgets1.add(expenseBudget);
            }
        }
        return expenseBudgets1;
    }

    @Override
    public ExpenseBudget getExpenseBudgetByNamePeriod(BudgetPeriod budgetPeriod, int userId, String categoryName) {
        ExpenseBudget expenseBudget1 = new ExpenseBudget();
        List<ExpenseBudget> expenseBudgets = getExpenseBudgetOfPeriod(budgetPeriod, userId);
        for(ExpenseBudget expenseBudget:expenseBudgets){
            if(expenseBudget.getCategory().getCategoryName().equals(categoryName)){
                return expenseBudget;
            }
        }
        return expenseBudget1;
    }
}
