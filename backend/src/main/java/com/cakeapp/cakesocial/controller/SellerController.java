package com.cakeapp.cakesocial.controller;

import com.cakeapp.cakesocial.model.Comment;
import com.cakeapp.cakesocial.model.Message;
import com.cakeapp.cakesocial.model.Product;
import com.cakeapp.cakesocial.repository.CommentRepository;
import com.cakeapp.cakesocial.repository.MessageRepository;
import com.cakeapp.cakesocial.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller")
public class SellerController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MessageRepository messageRepository;

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productRepository.save(product));
    }

    @PostMapping("/comments/{commentId}/reply")
    public ResponseEntity<Comment> replyToComment(@PathVariable Long commentId, @RequestBody String reply) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        comment.setText(comment.getText() + "\nSeller Reply: " + reply);
        return ResponseEntity.ok(commentRepository.save(comment));
    }

    @PostMapping("/messages")
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        return ResponseEntity.ok(messageRepository.save(message));
    }
}