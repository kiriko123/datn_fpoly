package com.datn.be.mapper;

import com.datn.be.dto.request.product.ProductCreateRequestDTO;
import com.datn.be.dto.request.product.ProductUpdateRequestDTO;
import com.datn.be.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapping {

    Product fromProductCreateRequestDTOToProduct(ProductCreateRequestDTO productCreateRequestDTO);

    Product fromProductUpdateRequestDTOToProduct(ProductUpdateRequestDTO productUpdateRequestDTO);

    void updateProduct(@MappingTarget Product product, ProductUpdateRequestDTO productUpdateRequestDTO);

    Product fromProductToProductResponse(Product product);
}
