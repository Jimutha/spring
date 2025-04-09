package com.cakeapp.cakesocial.repository;

import com.cakeapp.cakesocial.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {}