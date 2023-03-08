package com.finwise.services;

import com.finwise.models.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    boolean createUser(User user);

    User updateUser(User user);

    User deleteUser(int id);

    User getUserById(int id);

}
