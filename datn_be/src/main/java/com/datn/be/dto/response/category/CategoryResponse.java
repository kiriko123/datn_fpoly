package com.datn.be.dto.response.category;

import com.datn.be.model.Category;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    Long id;
    String name;
    String thumbnail;
    String description;
    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;
    boolean active;
    boolean hot;

    public static CategoryResponse fromCategoryToCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .thumbnail(category.getThumbnail())
                .description(category.getDescription())
                .createdAt(category.getCreatedAt())
                .createdBy(category.getCreatedBy())
                .updatedAt(category.getUpdatedAt())
                .updatedBy(category.getUpdatedBy())
                .active(category.isActive())
                .hot(category.isHot())
                .build();
    }
}
