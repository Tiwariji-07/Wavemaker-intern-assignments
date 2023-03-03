package com.finwise.implementations;

import com.finwise.models.Category;
import com.finwise.models.Category;
import com.finwise.services.CategoryService;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private SessionFactory sessionFactory;

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
        category.setUserId(userId);
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
}
