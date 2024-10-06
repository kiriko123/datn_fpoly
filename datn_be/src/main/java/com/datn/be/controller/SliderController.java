package com.datn.be.controller;

import com.datn.be.dto.request.sliders.SliderCreateRequestDTO;
import com.datn.be.dto.request.sliders.SliderUpdateRequestDTO;
import com.datn.be.dto.response.RestResponse;
import com.datn.be.model.Slider;
import com.datn.be.service.SliderService;
import com.datn.be.service.FileService;
import com.turkraft.springfilter.boot.Filter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/sliders")
@Validated
public class SliderController {

    private final SliderService sliderService;


    // Phương thức để lấy tất cả sliders với hỗ trợ phân trang
    @GetMapping
    public ResponseEntity<?> getAllSliders(@Filter Specification<Slider> specification, Pageable pageable) {
        log.info("Get All Sliders");
        return ResponseEntity.ok(sliderService.getAllSliders(specification, pageable));
    }

    // Phương thức để tạo mới slider
    @PostMapping
    public ResponseEntity<?> createSlider(@Valid @RequestBody SliderCreateRequestDTO sliderCreateRequestDTO) {
        log.info("Create Sliders: {}", sliderCreateRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(sliderService.create(sliderCreateRequestDTO));
    }

    // Phương thức để cập nhật slider
    @PutMapping
    public ResponseEntity<?> updateSlider(@Valid @RequestBody SliderUpdateRequestDTO sliderUpdateRequestDTO) {
        log.info("Update Sliders: {}", sliderUpdateRequestDTO);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(sliderService.update(sliderUpdateRequestDTO));
    }

    // Phương thức để xóa slider theo ID
    @DeleteMapping("/{id}")
    public RestResponse<?> deleteSlider(@PathVariable Long id) {
        log.info("Delete Sliders: {}", id);
        sliderService.delete(id);
        return RestResponse.builder()
                .statusCode(204)
                .message("Slider Deleted")
                .build();
    }
}
