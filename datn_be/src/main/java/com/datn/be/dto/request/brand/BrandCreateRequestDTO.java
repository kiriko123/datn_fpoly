package com.datn.be.dto.request.brand;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class BrandCreateRequestDTO {
    @NotBlank
    String name;
    String description;
    String thumbnail;
}
