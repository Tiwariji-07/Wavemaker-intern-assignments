package com.finwise.controllers;

import com.finwise.models.User;
import com.finwise.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    public List<User> getUser(){
        return userService.getAllUsers();
    }

    @PostMapping("/create")
    public boolean createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public User deleteUser(@PathVariable("id") int id){
        return userService.deleteUser(id);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") int id){
        return userService.getUserById(id);
    }
}
