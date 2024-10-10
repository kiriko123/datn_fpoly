package com.datn.be.controller;

import com.datn.be.dto.request.product.ProductCreateRequestDTO;
import com.datn.be.dto.request.product.ProductUpdateRequestDTO;
import com.datn.be.dto.response.RestResponse;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.product.ProductResponse;
import com.datn.be.model.Product;
import com.datn.be.service.ProductService;
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

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/products")
@Validated
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ResultPaginationResponse> getAllProducts(@Filter Specification<Product> specification, Pageable pageable) {
        log.info("Get All Products");
        ResultPaginationResponse response = productService.getAllProducts(specification, pageable);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductCreateRequestDTO productCreateRequestDTO) {
        log.info("Create Product: {}", productCreateRequestDTO);
        ProductResponse createdProduct = productService.create(productCreateRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductUpdateRequestDTO productUpdateRequestDTO) {
        log.info("Update Product ID: {} with data: {}", id, productUpdateRequestDTO);
        productUpdateRequestDTO.setId(id); // Set ID for the update request
        ProductResponse updatedProduct = productService.update(productUpdateRequestDTO);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedProduct);
    }


    @DeleteMapping("/{id}")
    public RestResponse<?> deleteProduct(@PathVariable Long id) {
        log.info("Delete Product ID: {}", id);
        productService.delete(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("Product Deleted")
                .build();
    }



    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        log.info("Get Product by ID: {}", id);
        ProductResponse productResponse = ProductResponse.fromProductToProductResponse(productService.getProductById(id));
        return ResponseEntity.ok(productResponse);
    }
}
