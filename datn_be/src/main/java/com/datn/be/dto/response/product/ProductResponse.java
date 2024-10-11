package com.datn.be.dto.response.product;

import com.datn.be.model.Brand;
import com.datn.be.model.Category;
import com.datn.be.model.Product;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    long id;

    String name;

    float price;

    float discount;

    String thumbnail;

    int quantity;

    int sold;

    String description;

    boolean active;

    boolean sale;

    boolean hot;

    List<String> images;

    Category category;

    Brand brand;

    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;

    public static ProductResponse from(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .thumbnail(product.getThumbnail())
                .quantity(product.getQuantity())
                .sold(product.getSold())
                .description(product.getDescription())
                .active(product.isActive())
                .sale(product.isSale())
                .hot(product.isHot())
                .images(product.getImages())
                .category(product.getCategory())
                .brand(product.getBrand())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .createdBy(product.getCreatedBy())
                .updatedBy(product.getUpdatedBy())
                .build();
    }
}
