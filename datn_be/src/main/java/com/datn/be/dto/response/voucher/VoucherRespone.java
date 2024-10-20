package com.datn.be.dto.response.voucher;


import com.datn.be.model.Voucher;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VoucherRespone {

    Long id;

    String voucherCode;
    float voucherValue;
    String description;
    Instant startDate;
    Instant endDate;
    boolean active;


    Instant createdAt;
    Instant updatedAt;
    String createdBy;
    String updatedBy;


    public static VoucherRespone fromVoucherToVoucherRespone(Voucher voucher) {
        VoucherRespone voucherRespone = VoucherRespone.builder()
                .id(voucher.getId())
                .voucherCode(voucher.getVoucherCode())
                .voucherValue(voucher.getVoucherValue())
                .description(voucher.getDescription())
                .startDate(voucher.getStartDate())
                .endDate(voucher.getEndDate())
                .active(voucher.isActive())
                .createdAt(voucher.getCreatedAt())
                .updatedAt(voucher.getUpdatedAt())
                .createdBy(voucher.getCreatedBy())
                .updatedBy(voucher.getUpdatedBy())
                .build();

        return voucherRespone;

    }
}
