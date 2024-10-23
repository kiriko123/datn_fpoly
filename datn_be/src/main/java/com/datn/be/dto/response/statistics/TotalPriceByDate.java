package com.datn.be.dto.response.statistics;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TotalPriceByDate {
    String date;
    double totalPrice;
}
