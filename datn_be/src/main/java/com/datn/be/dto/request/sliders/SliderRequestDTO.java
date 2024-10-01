package com.datn.be.dto.request.sliders;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SliderRequestDTO {
    private String imgUrl;// Đường dẫn đến file ảnh
    private String title;
    private String description;


}