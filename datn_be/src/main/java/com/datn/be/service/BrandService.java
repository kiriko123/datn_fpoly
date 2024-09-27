package com.datn.be.service;

import com.datn.be.dto.request.brand.BrandCreateRequestDTO;
import com.datn.be.dto.request.brand.BrandUpdateRequestDTO;
import com.datn.be.dto.request.category.CategoryCreateRequestDTO;
import com.datn.be.dto.response.brand.BrandRespone;
import com.datn.be.dto.response.category.CategoryResponse;
import com.datn.be.model.Brand;

import java.util.List;

public interface BrandService {
    List<Brand> getAllBrands();
    BrandRespone create(BrandCreateRequestDTO brandCreateRequestDTO);
    BrandRespone update(BrandUpdateRequestDTO brandUpdateRequestDTO);
    void delete(Long id);
    Brand getBrandById(Long id);
}
