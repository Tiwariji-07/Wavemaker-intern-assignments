package com.finwise.controllers;

import com.finwise.models.Login;
import com.finwise.models.User;
import com.finwise.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    public User loginController(@RequestBody Login login){
        return loginService.loginUser(login);
    }
}
