package com.railway.services;

import com.railway.model.Ticket;
import com.railway.model.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User createUser(User user);

    User updateUser(User user);

    User deleteUser(int id);

    User getUserById(int id);

    List<Ticket> getAllTicket(int id);
}
