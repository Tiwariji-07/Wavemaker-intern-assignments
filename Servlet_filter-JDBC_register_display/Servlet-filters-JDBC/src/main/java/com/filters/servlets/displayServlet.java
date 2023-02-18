package com.filters.servlets;

import com.filters.User;
import com.filters.services.UserService;
import com.filters.services.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

public class displayServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        UserService userService = new UserServiceImpl();
        ArrayList<User> users;
        PrintWriter out = resp.getWriter();
        try {
            users = userService.displayUsers();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        out.println("<html><body>");
        for(User user:users){
            out.println("<h3>First name: "+user.getFirstName()+" | Last Name: "+user.getLastName()+" | email: "+user.getEmail()+"</h3>");
        }
        out.println("<a href=/Servlet-filters-JDBC>Home</a>");
        out.println("</body></html>");
    }
}
