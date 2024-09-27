package com.datn.be.mapper;

import com.datn.be.dto.request.brand.BrandCreateRequestDTO;
import com.datn.be.dto.request.brand.BrandUpdateRequestDTO;
import com.datn.be.dto.request.category.CategoryCreateRequestDTO;
import com.datn.be.dto.request.category.CategoryUpdateRequestDTO;
import com.datn.be.dto.response.brand.BrandRespone;
import com.datn.be.dto.response.category.CategoryResponse;
import com.datn.be.model.Brand;
import com.datn.be.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BrandMapping {
    Brand fromBrandCreateRequestDTOToBrand(BrandCreateRequestDTO brandCreateRequestDTO);
    //    Category fromCategoryUpdateRequestDTOToCategory(CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    void updateBrand(@MappingTarget Brand brand, BrandUpdateRequestDTO brandUpdateRequestDTO);
    BrandRespone fromBrandToBrandResponse(Brand brand);
}
