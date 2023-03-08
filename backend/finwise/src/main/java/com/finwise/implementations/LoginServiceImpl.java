package com.finwise.implementations;

import com.finwise.models.Login;
import com.finwise.models.User;
import com.finwise.services.LoginService;
import com.finwise.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    UserService userService;

    public User loginUser(Login login) {
        List<User> userList = userService.getAllUsers();
        User nullUser = new User();
        for(User user : userList){
            if(user.getEmail().equalsIgnoreCase(login.getEmail()) &&
                    user.getPassword().equals(login.getPassword())){
                    return user;
            }
        }

        return nullUser;
    }
}
