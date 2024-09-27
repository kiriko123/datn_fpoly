package com.datn.be.controller;

import com.datn.be.dto.request.brand.BrandCreateRequestDTO;
import com.datn.be.dto.request.brand.BrandUpdateRequestDTO;
import com.datn.be.dto.response.RestResponse;
import com.datn.be.model.Brand;
import com.datn.be.model.User;
import com.datn.be.service.BrandService;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/brand")
@Validated
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public ResponseEntity<?> getAllBrands(@Filter Specification<Brand> specification, Pageable pageable){
        log.info("Get All Brand");
        return ResponseEntity.ok(brandService.getAllBrands(specification, pageable));
    }

    @PostMapping
    public ResponseEntity<?> createBrand(@Valid @RequestBody BrandCreateRequestDTO brandCreateRequestDTO){
        log.info("Create Brand: {} ", brandCreateRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(brandService.create(brandCreateRequestDTO));
    }

    @PutMapping
    public ResponseEntity<?> updateBrand(@Valid @RequestBody BrandUpdateRequestDTO brandUpdateRequestDTO){
        log.info("Update Brand: {}", brandUpdateRequestDTO);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(brandService.update(brandUpdateRequestDTO));
    }

    @DeleteMapping("/{id}")
    public RestResponse<?> deleteBrand(@PathVariable Long id){
        log.info("Delete Brand: {}", id);
        brandService.delete(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("Brand Deleted")
                .build();
    }
}
