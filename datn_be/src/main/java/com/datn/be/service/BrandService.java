package com.datn.be.service;

import com.datn.be.dto.request.brand.BrandCreateRequestDTO;
import com.datn.be.dto.request.brand.BrandUpdateRequestDTO;
import com.datn.be.dto.request.category.CategoryCreateRequestDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.brand.BrandRespone;
import com.datn.be.dto.response.category.CategoryResponse;
import com.datn.be.model.Brand;
import com.datn.be.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface BrandService {
    ResultPaginationResponse getAllBrands(Specification<Brand> spec, Pageable pageable);
    BrandRespone create(BrandCreateRequestDTO brandCreateRequestDTO);
    BrandRespone update(BrandUpdateRequestDTO brandUpdateRequestDTO);
    void delete(Long id);
    Brand getBrandById(Long id);


}
