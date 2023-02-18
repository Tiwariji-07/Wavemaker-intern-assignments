package com.filters.services;

import com.filters.User;

import java.sql.SQLException;
import java.util.ArrayList;

public interface UserService {

    boolean registerUser(User user) throws SQLException;
    ArrayList<User> loginUser() throws SQLException;

    ArrayList<User> displayUsers() throws SQLException;
}
