package com.datn.be.service;

import com.datn.be.dto.request.voucher.VoucherCreateRequestDTO;
import com.datn.be.dto.request.voucher.VoucherUpdateRequestDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.voucher.VoucherRespone;
import com.datn.be.model.Brand;
import com.datn.be.model.Voucher;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface VoucherService {
    ResultPaginationResponse getAllVouchers(Specification<Voucher> spec, Pageable pageable);

    VoucherRespone create(VoucherCreateRequestDTO voucherCreateRequestDTO);

    VoucherRespone update(VoucherUpdateRequestDTO voucherUpdateRequestDTO);

    void delete(Long id);

    Voucher getVoucherById(Long id);
}
