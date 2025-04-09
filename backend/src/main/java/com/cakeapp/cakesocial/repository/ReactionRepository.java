package com.cakeapp.cakesocial.repository;

import com.cakeapp.cakesocial.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {}