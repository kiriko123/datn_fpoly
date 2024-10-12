package com.datn.be.repository;


import com.datn.be.model.Brand;
import com.datn.be.model.Slider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SliderRepository extends JpaRepository<Slider, Long> {
    boolean existsByTitle(String title);

    Page<Slider> findAll(Specification<Slider> spec, Pageable pageable);
}