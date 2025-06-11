package com.shubham.StudentRecords.service;

import com.shubham.StudentRecords.model.Users;
import com.shubham.StudentRecords.model.UserPrincipal;
import com.shubham.StudentRecords.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

@Repository
public class MyUserDetailService implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users =userRepo.findByUsername(username);
        if (users ==null){
            throw new UsernameNotFoundException("users not found");
        }
        System.out.println("Loaded user: " + users.getUsername());
        System.out.println("Password from DB: " + users.getPassword());

        return new UserPrincipal(users);
    }
}
