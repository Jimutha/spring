package com.cakeapp.cakesocial.repository;

import com.cakeapp.cakesocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}