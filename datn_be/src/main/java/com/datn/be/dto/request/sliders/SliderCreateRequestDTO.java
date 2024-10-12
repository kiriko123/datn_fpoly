package com.datn.be.dto.request.sliders;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SliderCreateRequestDTO {
    @NotBlank
    String title; // Tiêu đề của slider
    String description; // Mô tả của slider
    @NotBlank
    String imgUrl; // URL của hình ảnh slider
    // Có thể thêm các trường khác nếu cần
}
