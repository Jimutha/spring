package com.cakeapp.cakesocial.repository;

import com.cakeapp.cakesocial.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}