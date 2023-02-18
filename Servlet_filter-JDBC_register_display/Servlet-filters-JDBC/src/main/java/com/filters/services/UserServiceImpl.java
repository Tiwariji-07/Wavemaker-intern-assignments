package com.filters.services;

import com.filters.User;
import java.sql.*;
import java.util.ArrayList;
import java.util.Scanner;

public class UserServiceImpl implements UserService{
    Scanner sc = new Scanner(System.in);
//    Class.forName("com.mysql.jdbc.Driver");
//    DriverManager.registerDriver(new com.mysql.jdbc.Driver ());

    String databaseUrl = "jdbc:mysql://localhost:3306/servlet_filter";
    String userName = "root";
    String password = "vivek";

    Connection connection;

    {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(databaseUrl,userName,password);
            System.out.println("Connected");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    public boolean registerUser(User user) throws SQLException {
        Statement statement = connection.createStatement();
        String query = "SELECT email FROM users";
        ResultSet result = statement.executeQuery(query);
        boolean flag=true;

        while (result.next()){
            if(user.getEmail().equals(result.getString(1))){
                flag=false;
                break;
            }
        }
        if(flag){
            String query2 = "INSERT INTO users(first_name,last_name,email,password) values (?,?,?,?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query2);
            preparedStatement.setString(1,user.getFirstName());
            preparedStatement.setString(2,user.getLastName());
            preparedStatement.setString(3,user.getEmail());
            preparedStatement.setString(4,user.getPassword());
            boolean result2 = preparedStatement.execute();
        }
        return flag;
    }

    public ArrayList<User> loginUser() throws SQLException {

        Statement statement = connection.createStatement();
        String query = "SELECT * FROM users";
        ResultSet result = statement.executeQuery(query);
        ArrayList<User> users = new ArrayList<User>();
        while (result.next()){
            User user = new User();
            String firstName= result.getString(2);
            String lastName=result.getString(3);
            String email=result.getString(4);
            String password=result.getString(5);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            user.setPassword(password);
            users.add(user);
//            System.out.println("First name: "+firstName+" | Last Name: "+lastName+" | email: "+email);

        }
        return users;
    }

    public ArrayList<User> displayUsers() throws SQLException {
        Statement statement = connection.createStatement();
        String query = "SELECT * FROM users";
        ResultSet result = statement.executeQuery(query);
        ArrayList<User> users = new ArrayList<User>();
        while (result.next()){
            User user = new User();
            String firstName= result.getString(2);
            String lastName=result.getString(3);
            String email=result.getString(4);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            users.add(user);
//            System.out.println("First name: "+firstName+" | Last Name: "+lastName+" | email: "+email);

        }
        return users;
    }
}
