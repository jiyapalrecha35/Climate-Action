package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.User;
import com.example.backend.repo.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Check if user with the same email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        // Save the user
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
