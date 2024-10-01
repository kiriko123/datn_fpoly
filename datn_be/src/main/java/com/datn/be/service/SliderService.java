package com.datn.be.service;

import com.datn.be.dto.request.sliders.SliderRequestDTO;
import com.datn.be.dto.response.sliders.SliderResponseDTO;

import java.util.List;

public interface SliderService {
    List<SliderResponseDTO> getAllSliders();
    SliderResponseDTO getSliderById(Long id);
    SliderResponseDTO createSlider(SliderRequestDTO sliderRequest);
    SliderResponseDTO updateSlider(Long id, SliderRequestDTO sliderRequest);
    void deleteSlider(Long id);
}