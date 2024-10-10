package com.datn.be.repository;

import com.datn.be.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsByName(String name); // Kiểm tra xem sản phẩm có tồn tại dựa trên tên

    Page<Product> findAll(Specification<Product> spec, Pageable pageable); // Lấy tất cả sản phẩm theo Specification và Pageable
}
