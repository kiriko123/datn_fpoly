package com.datn.be.dto.request.product;

import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductUpdateRequestDTO {

    @NotNull
    Long id;

    @NotBlank
    String name;

    String thumbnail;

    String description;

    @Positive
    float price;


    int quantity;



    public void setId(Long id) {
    }
}
