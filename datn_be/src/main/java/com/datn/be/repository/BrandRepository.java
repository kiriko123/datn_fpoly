package com.datn.be.repository;

import com.datn.be.model.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    boolean existsByName(String name);

    Page<Brand> findAll(Specification<Brand> spec, Pageable pageable);
}
