package com.datn.be.service;

import com.datn.be.dto.request.sliders.SliderCreateRequestDTO;
import com.datn.be.dto.request.sliders.SliderUpdateRequestDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.sliders.SliderResponse;
import com.datn.be.model.Slider;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface SliderService {
    ResultPaginationResponse getAllSliders(Specification<Slider> spec, Pageable pageable);
    SliderResponse create(SliderCreateRequestDTO sliderCreateRequestDTO);
    SliderResponse update(SliderUpdateRequestDTO sliderUpdateRequestDTO);
    void delete(Long id);
    Slider getSliderById(Long id);
}
