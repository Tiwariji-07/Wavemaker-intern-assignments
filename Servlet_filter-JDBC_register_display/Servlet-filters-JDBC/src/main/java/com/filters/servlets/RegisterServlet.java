package com.filters.servlets;

import com.filters.User;
import com.filters.services.UserService;
import com.filters.services.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

public class RegisterServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//
        PrintWriter out = resp.getWriter();
        resp.setContentType ("text/html");
        out.println("<h1>Successfully registered! </h1>");


    }
}
