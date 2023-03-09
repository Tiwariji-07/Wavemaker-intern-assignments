package com.finwise.implementations;

import com.finwise.models.*;
import com.finwise.models.Category;
import com.finwise.services.CategoryService;
import com.finwise.services.UserService;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private SessionFactory sessionFactory;

//    @Autowired
//    UserService userService;

    public List<Category> getAllCategories(int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        String sql = "SELECT * FROM category WHERE user_id = :user_id";
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(Category.class);
        query.setParameter("user_id", userId);
        List results = query.list();
        transaction.commit();
        session.close();
        return results;
    }

    public Category createCategory(Category category,int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
//        User user = userService.getUserById(userId);
        category.setUserId(userId);
//        category.setUser(user);
        session.save(category);
        transaction.commit();
        session.close();
        return category;
    }

    public Category updateCategory(Category category,int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        category.setUserId(userId);
        session.saveOrUpdate(category);
        transaction.commit();
        session.close();
        return category;
    }

    public Category deleteCategory(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Category category = session.get(Category.class,id);
        session.delete(category);
        transaction.commit();
        session.close();
        return category;
    }

    public Category getCategoryById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        Category category = session.get(Category.class,id);
        transaction.commit();
        session.close();
        return category;
    }

    public List<Category> getUnusedCategories(BudgetPeriod budgetPeriod,int userId) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        String sql = "SELECT * FROM expense_budget WHERE user_id = :user_id";
        SQLQuery query = session.createSQLQuery(sql);
        query.addEntity(ExpenseBudget.class);
        query.setParameter("user_id", userId);
        List<ExpenseBudget> results = (List<ExpenseBudget>) query.list();
        List<Category> usedCategories = new ArrayList<Category>();
        for(ExpenseBudget expenseBudget:results){
            if(expenseBudget.getBudgetMonth() == budgetPeriod.getMonth() && expenseBudget.getBudgetYear() == budgetPeriod.getYear()){
                usedCategories.add(expenseBudget.getCategory());
            }
        }
        List<Category> categoryList = new ArrayList<Category>();
        List<Category> unusedCategories = getAllCategories(userId);
        categoryList = getAllCategories(userId);
        int count = 0;
        for(Category category:categoryList){
            for(Category category1: usedCategories){
                if(category1.getCategoryId() == category.getCategoryId()){
                    unusedCategories.set(count,null);
                }
            }
            count++;
        }
//        for(Category category:usedCategories){
//            categoryList.remove(category);
//        }
        transaction.commit();
        session.close();
        return unusedCategories;
    }
}
