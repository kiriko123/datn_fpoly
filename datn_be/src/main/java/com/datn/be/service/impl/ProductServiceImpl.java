package com.datn.be.service.impl;

import com.datn.be.dto.request.product.ProductCreateRequestDTO;
import com.datn.be.dto.request.product.ProductUpdateRequestDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.product.ProductResponse;
import com.datn.be.exception.InvalidDataException;
import com.datn.be.exception.ResourceNotFoundException;
import com.datn.be.mapper.ProductMapping;
import com.datn.be.model.Product;
import com.datn.be.repository.ProductRepository;
import com.datn.be.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapping productMapping;

    @Override
    public ResultPaginationResponse getAllProducts(Specification<Product> spec, Pageable pageable) {
        // Lấy tất cả sản phẩm theo điều kiện tìm kiếm và phân trang
        Page<Product> products = productRepository.findAll(spec, pageable);

        // Tạo thông tin phân trang
        ResultPaginationResponse.Meta meta = ResultPaginationResponse.Meta.builder()
                .total(products.getTotalElements())
                .pages(products.getTotalPages())
                .page(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .build();

        // Chuyển đổi danh sách sản phẩm sang danh sách ProductResponse
        List<Product> productResponses = products.getContent().stream()
                .map(productMapping::fromProductToProductResponse)
                .toList();

        // Trả về kết quả phân trang
        return ResultPaginationResponse.builder()
                .meta(meta)
                .result(productResponses)
                .build();
    }

    @Override
    public ProductResponse create(ProductCreateRequestDTO productCreateRequestDTO) {
        // Kiểm tra xem tên sản phẩm đã tồn tại chưa
        if (productRepository.existsByName(productCreateRequestDTO.getName())) {
            throw new InvalidDataException("Product name already exists");
        }

        // Tạo mới sản phẩm
        Product product = Product.builder()
                .name(productCreateRequestDTO.getName())
                .thumbnail(productCreateRequestDTO.getThumbnail())
                .description(productCreateRequestDTO.getDescription())
                .price(productCreateRequestDTO.getPrice())
                .quantity(productCreateRequestDTO.getQuantity())
                .active(true) // Giả định rằng sản phẩm được tạo là hoạt động
                .build();

        // Lưu sản phẩm và trả về phản hồi
        return ProductResponse.fromProductToProductResponse(productRepository.save(product));
    }

    @Override
    public ProductResponse update(ProductUpdateRequestDTO productUpdateRequestDTO) {
        // Lấy sản phẩm theo ID
        Product product = getProductById(productUpdateRequestDTO.getId());

        // Cập nhật thông tin sản phẩm
        product.setName(productUpdateRequestDTO.getName());
        product.setThumbnail(productUpdateRequestDTO.getThumbnail());
        product.setDescription(productUpdateRequestDTO.getDescription());
        product.setPrice(productUpdateRequestDTO.getPrice());
        product.setQuantity(productUpdateRequestDTO.getQuantity());

        // Lưu và trả về phản hồi
        return ProductResponse.fromProductToProductResponse(productRepository.save(product));
    }

    @Override
    public void delete(Long id) {
        // Kiểm tra xem sản phẩm có tồn tại không
        Product product = getProductById(id);
        product.setActive(false); // Đánh dấu sản phẩm là không hoạt động
        productRepository.save(product); // Lưu sản phẩm đã cập nhật
    }

    @Override
    public Product getProductById(Long id) {
        // Tìm kiếm sản phẩm theo ID
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }
}
