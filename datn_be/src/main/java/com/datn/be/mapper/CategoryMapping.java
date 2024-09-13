package com.datn.be.mapper;

import com.datn.be.dto.request.category.CategoryCreateRequestDTO;
import com.datn.be.dto.request.category.CategoryUpdateRequestDTO;
import com.datn.be.dto.response.category.CategoryResponse;
import com.datn.be.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapping {
    Category fromCategoryCreateRequestDTOToCategory(CategoryCreateRequestDTO categoryCreateRequestDTO);
//    Category fromCategoryUpdateRequestDTOToCategory(CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    void updateCategory(@MappingTarget Category category, CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    CategoryResponse fromCategoryToCategoryResponse(Category category);
}
