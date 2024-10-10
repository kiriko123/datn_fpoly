package com.datn.be.dto.request.product;

import jakarta.validation.constraints.*;
import lombok.Getter;

import java.util.List;

@Getter
public class ProductCreateRequestDTO {

    @NotBlank
    String name;
    String thumbnail;
    String description;

    @Positive
    float price;
    int quantity;

}

