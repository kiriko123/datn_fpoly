package com.datn.be.repository;

import com.datn.be.model.Voucher;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    boolean existsByVoucherCode(String voucherCode);

    Page<Voucher> findAll(Specification<Voucher> spec, Pageable pageable);
}
