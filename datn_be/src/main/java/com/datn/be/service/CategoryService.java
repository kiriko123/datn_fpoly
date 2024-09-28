package com.datn.be.service;

import com.datn.be.dto.request.category.CategoryCreateRequestDTO;
import com.datn.be.dto.request.category.CategoryUpdateRequestDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.category.CategoryResponse;
import com.datn.be.model.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    CategoryResponse create(CategoryCreateRequestDTO categoryCreateRequestDTO);
    CategoryResponse update(CategoryUpdateRequestDTO categoryUpdateRequestDTO);
    void delete(Long id);
    ResultPaginationResponse getAllCategories(Specification<Category> specification, Pageable pageable);
    Category getCategoryById(Long id);
}
