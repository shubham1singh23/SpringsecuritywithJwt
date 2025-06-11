package com.shubham.StudentRecords.controller;

import com.shubham.StudentRecords.model.Users;
import com.shubham.StudentRecords.service.JwtService;
import com.shubham.StudentRecords.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public Users register(@RequestBody Users user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users users){
        Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(users.getUsername(),users.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(users.getUsername());
        }
        else{
            return "Login Failed";
        }
    }
}
