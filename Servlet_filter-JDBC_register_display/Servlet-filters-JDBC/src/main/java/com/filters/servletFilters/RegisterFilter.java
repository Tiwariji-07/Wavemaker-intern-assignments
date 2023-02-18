package com.filters.servletFilters;

import com.filters.User;
import com.filters.services.UserService;
import com.filters.services.UserServiceImpl;

import javax.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

public class RegisterFilter implements Filter {
    FilterConfig filterConfig;
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig=filterConfig;
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain filterChain) throws IOException, ServletException {
        User user = new User();
        UserService userService = new UserServiceImpl();
        String firstName = req.getParameter("firstName");
        String lastName = req.getParameter("lastName");
        String email = req.getParameter("yourEmailID");
        String password = req.getParameter("yourPassword");

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(password);
        boolean flag;
        try {
            flag = userService.registerUser(user);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        PrintWriter out = resp.getWriter();
        resp.setContentType ("text/html");
//        out.println("<html><body>");
        if(flag){

            filterChain.doFilter(req,resp);
        }else{
            out.println("<h1>Email already registered. Try again ! </h1>");
        }
        out.println("<a href=/Servlet-filters-JDBC>Home</a>");
        out.println("<a href=/Servlet-filters-JDBC/register-form>Back to registration</a>");

    }

    public void destroy() {

    }
}
