package com.datn.be.service.impl;

import com.datn.be.dto.request.sliders.SliderRequestDTO;
import com.datn.be.dto.response.sliders.SliderResponseDTO;
import com.datn.be.model.Slider;
import com.datn.be.repository.SliderRepository;
import com.datn.be.service.SliderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SliderServiceImpl implements SliderService {

    @Autowired
    private SliderRepository sliderRepository;

    @Override
    public List<SliderResponseDTO> getAllSliders() {
        List<Slider> sliders = sliderRepository.findAll();
        return sliders.stream()
                .map(this::toSliderResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SliderResponseDTO getSliderById(Long id) {
        Slider slider = sliderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slider not found with id " + id));
        return toSliderResponseDTO(slider);
    }

    @Override
    public SliderResponseDTO createSlider(SliderRequestDTO sliderRequest) {
        Slider slider = toSlider(sliderRequest);
        Slider savedSlider = sliderRepository.save(slider);
        return toSliderResponseDTO(savedSlider);
    }

    @Override
    public SliderResponseDTO updateSlider(Long id, SliderRequestDTO sliderRequest) {
        Slider slider = sliderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slider not found with id " + id));
        slider.setImgUrl(sliderRequest.getImgUrl());
        slider.setTitle(sliderRequest.getTitle());
        slider.setDescription(sliderRequest.getDescription());
        Slider updatedSlider = sliderRepository.save(slider);
        return toSliderResponseDTO(updatedSlider);
    }

    @Override
    public void deleteSlider(Long id) {
        Slider slider = sliderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slider not found with id " + id));
        sliderRepository.delete(slider);
    }

    // Phương thức chuyển đổi từ SliderRequestDTO sang Slider
    private Slider toSlider(SliderRequestDTO request) {
        Slider slider = new Slider();
        slider.setImgUrl(request.getImgUrl());
        slider.setTitle(request.getTitle());
        slider.setDescription(request.getDescription());
        return slider;
    }

    // Phương thức chuyển đổi từ Slider sang SliderResponseDTO
    private SliderResponseDTO toSliderResponseDTO(Slider slider) {
        SliderResponseDTO response = new SliderResponseDTO();
        response.setId(slider.getId());
        response.setImgUrl(slider.getImgUrl());
        response.setTitle(slider.getTitle());
        response.setDescription(slider.getDescription());
        return response;
    }
}