package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.User;
import com.example.backend.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api") // Add a common base path
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello, world!";
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully: " + registeredUser.getEmail());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user) {
        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (loggedInUser != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User logged in successfully");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}
