package com.datn.be.dto.response.rating;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RatingResponseDto {

    private Long id;
    private String content;
    private int numberStars;
    private String userName;
    private String adminResponse;

}
