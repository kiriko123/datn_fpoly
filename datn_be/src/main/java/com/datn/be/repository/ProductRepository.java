package com.datn.be.repository;

import com.datn.be.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductRepository extends JpaRepository<Product, Long> , JpaSpecificationExecutor<Product> {
    boolean existsByName(String name);
}
