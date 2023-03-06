package com.finwise.services;

import com.finwise.models.Login;
import com.finwise.models.User;
import org.springframework.http.ResponseEntity;

public interface LoginService {

    User loginUser(Login login);
}
