package com.datn.be.dto.response.sliders;

import com.datn.be.dto.response.brand.BrandRespone;
import com.datn.be.model.Brand;
import com.datn.be.model.Slider;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

public class SliderResponse {
    private Long id;
    private String imgUrl; // Đường dẫn đến ảnh
    private String title;
    private String description;
    Instant createdAt;
    Instant updatedAt;
    private String createdBy;
    private String updatedBy;


}