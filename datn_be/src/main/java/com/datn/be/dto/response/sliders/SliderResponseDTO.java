package com.datn.be.dto.response.sliders;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SliderResponseDTO {
    private Long id;
    private String imgUrl; // Đường dẫn đến ảnh
    private String title;
    private String description;
    private String createdBy;
    private String updatedBy;


}