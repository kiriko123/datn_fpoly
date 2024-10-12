package com.datn.be.dto.response.brand;

import com.datn.be.model.Brand;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BrandRespone {
    Long id;
    String name;
    String description;
    String thumbnail;
    boolean active;
    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;

    public static BrandRespone fromBrandToBrandRespone(Brand brand){
        BrandRespone brandRespone = BrandRespone.builder()
                .id(brand.getId())
                .name(brand.getName())
                .description(brand.getDescription())
                .thumbnail(brand.getThumbnail())
                .active(brand.isActive())
                .createdAt(brand.getCreatedAt())
                .updatedAt(brand.getUpdatedAt())
                .createdBy(brand.getCreatedBy())
                .updatedBy(brand.getUpdatedBy())
                .build();

        return brandRespone;
    }

}
