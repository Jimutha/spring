package com.cakeapp.cakesocial.controller;

import com.cakeapp.cakesocial.model.User;
import com.cakeapp.cakesocial.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping("/login") // Handled by Spring Security
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Login successful");
    }
}