package com.finwise.implementations;

import com.finwise.models.User;
import com.finwise.services.UserService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private SessionFactory sessionFactory;

    public List<User> getAllUsers() {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        List<User> userList=session.createQuery("from User",User.class).list();
        transaction.commit();
        session.close();
        return userList;
    }

    public User createUser(User user) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        session.save(user);
        transaction.commit();
        session.close();
        return user;
    }

    public User updateUser(User user) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        session.saveOrUpdate(user);
        transaction.commit();
        session.close();
        return user;
    }

    public User deleteUser(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        User user = session.get(User.class,id);
        session.delete(user);
        transaction.commit();
        session.close();
        return user;
    }

    public User getUserById(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction= session.beginTransaction();
        User user = session.get(User.class,id);
        transaction.commit();
        session.close();
        return user;
    }
}