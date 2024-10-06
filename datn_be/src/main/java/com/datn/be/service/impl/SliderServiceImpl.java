package com.datn.be.service.impl;

import com.datn.be.dto.request.sliders.SliderCreateRequestDTO;
import com.datn.be.dto.request.sliders.SliderUpdateRequestDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.sliders.SliderResponse;
import com.datn.be.exception.InvalidDataException;
import com.datn.be.exception.ResourceNotFoundException;
import com.datn.be.model.Slider;
import com.datn.be.repository.SliderRepository;
import com.datn.be.service.SliderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SliderServiceImpl implements SliderService {

    private final SliderRepository sliderRepository;

    @Override
    public ResultPaginationResponse getAllSliders(Specification<Slider> specification, Pageable pageable) {
        Page<Slider> sliderPage = sliderRepository.findAll(specification, pageable);

        // Tạo Meta cho phản hồi
        ResultPaginationResponse.Meta meta = ResultPaginationResponse.Meta.builder()
                .total(sliderPage.getTotalElements())
                .pages(sliderPage.getTotalPages())
                .page(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .build();

        // Chuyển đổi danh sách Slider thành danh sách SliderResponse
        List<SliderResponse> sliderResponses = sliderPage.getContent()
                .stream()
                .map(slider -> SliderResponse.builder()
                        .id(slider.getId())
                        .imgUrl(slider.getImgUrl())
                        .title(slider.getTitle())
                        .description(slider.getDescription())
                        .createdAt(slider.getCreatedAt())
                        .updatedAt(slider.getUpdatedAt())
                        .createdBy(slider.getCreatedBy())
                        .updatedBy(slider.getUpdatedBy())
                        .build())
                .toList();

        return ResultPaginationResponse.builder()
                .meta(meta)
                .result(sliderResponses)
                .build();
    }

    @Override
    public SliderResponse create(SliderCreateRequestDTO sliderCreateRequestDTO) {
        // Kiểm tra xem tên slider đã tồn tại chưa
        if (sliderRepository.existsByTitle(sliderCreateRequestDTO.getTitle())) {
            throw new InvalidDataException("Slider name already exists");
        }

        Slider slider = Slider.builder()
                .title(sliderCreateRequestDTO.getTitle())
                .description(sliderCreateRequestDTO.getDescription())
                .imgUrl(sliderCreateRequestDTO.getImgUrl())
                .build();

        slider = sliderRepository.save(slider);

        return SliderResponse.builder()
                .id(slider.getId())
                .imgUrl(slider.getImgUrl())
                .title(slider.getTitle())
                .description(slider.getDescription())
                .createdAt(slider.getCreatedAt())
                .updatedAt(slider.getUpdatedAt())
                .createdBy(slider.getCreatedBy())
                .updatedBy(slider.getUpdatedBy())
                .build();
    }

    @Override
    public SliderResponse update(SliderUpdateRequestDTO sliderUpdateRequestDTO) {
        Slider slider = this.getSliderById(sliderUpdateRequestDTO.getId());

        slider.setTitle(sliderUpdateRequestDTO.getTitle());
        slider.setDescription(sliderUpdateRequestDTO.getDescription());
        slider.setImgUrl(sliderUpdateRequestDTO.getImgUrl());

        slider.setUpdatedAt(Instant.now());
        slider.setUpdatedBy("currentUser"); // Cập nhật người sửa, có thể thay bằng thông tin thực tế

        slider = sliderRepository.save(slider);

        return SliderResponse.builder()
                .id(slider.getId())
                .imgUrl(slider.getImgUrl())
                .title(slider.getTitle())
                .description(slider.getDescription())
                .updatedAt(slider.getUpdatedAt())
                .createdBy(slider.getCreatedBy())
                .updatedBy(slider.getUpdatedBy())
                .build();
    }

    @Override
    public void delete(Long id) {
        if (!sliderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Slider not found");
        }
        sliderRepository.deleteById(id); // Sử dụng deleteById để xóa
    }

    @Override
    public Slider getSliderById(Long id) {
        return sliderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Slider not found"));
    }
}
