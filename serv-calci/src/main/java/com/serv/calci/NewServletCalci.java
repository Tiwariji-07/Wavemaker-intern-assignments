package com.serv.calci;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class NewServletCalci extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");
//        int operand1 = Integer.parseInt(req.getParameter("operand1"));
//        int operand2 = Integer.parseInt(req.getParameter("operand2"));
        float operand1 = Float.parseFloat(req.getParameter("operand1"));
        float operand2 = Float.parseFloat(req.getParameter("operand2"));
        String operation = req.getParameter("operation");
        float result = 0;
        PrintWriter out =  resp.getWriter();
        switch(operation){
            case "add": {result = operand1 + operand2;
                out.println("Addition of two numbers "+operand1+" and "+operand2+" is:");
            }
            break;
            case "subtract": {result = operand1 - operand2;
                out.println("Subtraction of two numbers "+operand1+" and "+operand2+" is:");
            }
            break;
            case "multiply": {result = operand1 * operand2;
                out.println("Multiplication of two numbers "+operand1+" and "+operand2+" is:");
            }
            break;
            case "divide": {result = operand1 / operand2;
                out.println("Division of two numbers "+operand1+" and "+operand2+" is:");
            }
            break;
            case "modulus": {result = operand1 % operand2;
                out.println("Modulus of two numbers "+operand1+" and "+operand2+" is:");
            }
            break;
        }
//        int sum = operand1+operand2;

        out.println(result);

    }
}
