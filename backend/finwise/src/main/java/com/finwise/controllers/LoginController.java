package com.finwise.controllers;

import com.finwise.models.Login;
import com.finwise.models.User;
import com.finwise.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    public User loginController(@RequestBody Login login){
        return loginService.loginUser(login);
    }
}
