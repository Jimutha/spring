package com.cakeapp.cakesocial.repository;

import com.cakeapp.cakesocial.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {}