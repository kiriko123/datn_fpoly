package com.datn.be.dto.response.product;

import com.datn.be.model.Product;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    Long id;
    String name;
    String thumbnail;
    String description;
    float price;
    int quantity;
    boolean active;
    List<String> images; // Nếu bạn muốn thêm danh sách hình ảnh sản phẩm
    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;

    public static ProductResponse fromProductToProductResponse(Product product) { // Đã sửa tên phương thức ở đây
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .thumbnail(product.getThumbnail())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .active(product.isActive())
                .images(product.getImages())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .createdBy(product.getCreatedBy())
                .updatedBy(product.getUpdatedBy())
                .build();
    }
}
