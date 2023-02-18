package com.filters.servletFilters;

import com.filters.User;
import com.filters.services.UserService;
import com.filters.services.UserServiceImpl;

import javax.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

public class LoginFilter implements Filter {
    FilterConfig filterConfig;
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain filterChain) throws IOException, ServletException {
        User user = new User();
        UserService userService = new UserServiceImpl();
        String email = req.getParameter("yourEmailID");
        String password = req.getParameter("yourPassword");

        user.setEmail(email);
        user.setPassword(password);
        ArrayList<User> users= new ArrayList<User>();
//        User users;
        try {
            users = userService.loginUser();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        PrintWriter out = resp.getWriter();
        resp.setContentType ("text/html");
//        out.println("<html><body>");
        boolean flag=false;
        for(User user1:users){
            if(user1.getEmail().equals(user.getEmail()) && user1.getPassword().equals(user.getPassword())){
                flag=true;
                out.println("Hello "+user1.getFirstName()+" "+user1.getLastName());
                break;
            }
        }
        if(flag){

            filterChain.doFilter(req,resp);
        }else{
            out.println("<h1>Either email is not registered or password is incorrect ! </h1>");

        }

        out.println("<a href=/Servlet-filters-JDBC>Home</a>");
//        out.println("<a href=/Servlet-filters-JDBC/login-form>Home</a>");
    }

    public void destroy() {

    }
}
