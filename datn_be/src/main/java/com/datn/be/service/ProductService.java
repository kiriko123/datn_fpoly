package com.datn.be.service;

import com.datn.be.dto.request.product.ProductCreateRequestDTO;
import com.datn.be.dto.request.product.ProductUpdateRequestDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.product.ProductResponse;
import com.datn.be.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface ProductService {
    ResultPaginationResponse getAllProducts(Specification<Product> spec, Pageable pageable);

    ProductResponse create(ProductCreateRequestDTO productCreateRequestDTO);

    ProductResponse update(ProductUpdateRequestDTO productUpdateRequestDTO);

    void delete(Long id);

    Product getProductById(Long id); // Sửa để trả về ProductResponse

}