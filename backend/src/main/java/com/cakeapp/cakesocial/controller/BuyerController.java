package com.cakeapp.cakesocial.controller;

import com.cakeapp.cakesocial.model.Comment;
import com.cakeapp.cakesocial.model.Message;
import com.cakeapp.cakesocial.model.Product;
import com.cakeapp.cakesocial.model.Reaction;
import com.cakeapp.cakesocial.repository.CommentRepository;
import com.cakeapp.cakesocial.repository.MessageRepository;
import com.cakeapp.cakesocial.repository.ProductRepository;
import com.cakeapp.cakesocial.repository.ReactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buyer")
public class BuyerController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MessageRepository messageRepository;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/products/{productId}/reactions")
    public ResponseEntity<Reaction> addReaction(@PathVariable Long productId, @RequestBody Reaction reaction) {
        reaction.setProduct(productRepository.findById(productId).orElseThrow());
        return ResponseEntity.ok(reactionRepository.save(reaction));
    }

    @PostMapping("/products/{productId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long productId, @RequestBody Comment comment) {
        comment.setProduct(productRepository.findById(productId).orElseThrow());
        return ResponseEntity.ok(commentRepository.save(comment));
    }

    @PostMapping("/products/{productId}/share")
    public ResponseEntity<String> shareProduct(@PathVariable Long productId) {
        return ResponseEntity.ok("Product " + productId + " shared on wall");
    }

    @PostMapping("/products/{productId}/request-recipe")
    public ResponseEntity<Message> requestRecipe(@PathVariable Long productId, @RequestBody Message message) {
        message.setProductId(productId);
        return ResponseEntity.ok(messageRepository.save(message));
    }

    @GetMapping("/products/{productId}/chat")
    public ResponseEntity<List<Message>> getChat(@PathVariable Long productId) {
        return ResponseEntity.ok(messageRepository.findAll().stream()
            .filter(m -> m.getProductId() != null && m.getProductId().equals(productId))
            .toList());
    }

    @PostMapping("/payment")
    public ResponseEntity<String> processPayment(@RequestBody String paymentDetails) {
        return ResponseEntity.ok("Payment processed: " + paymentDetails);
    }
}