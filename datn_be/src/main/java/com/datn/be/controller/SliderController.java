package com.datn.be.controller;

import com.datn.be.dto.request.sliders.SliderRequestDTO;
import com.datn.be.dto.response.sliders.SliderResponseDTO;

import com.datn.be.service.SliderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sliders")
@RequiredArgsConstructor
public class SliderController {

    private final SliderService sliderService;



    @GetMapping
    public ResponseEntity<List<SliderResponseDTO>> getAllSliders() {
        List<SliderResponseDTO> sliders = sliderService.getAllSliders();
        return ResponseEntity.ok(sliders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SliderResponseDTO> getSliderById(@PathVariable Long id) {
        SliderResponseDTO slider = sliderService.getSliderById(id);
        return ResponseEntity.ok(slider);
    }

    @PostMapping
    public ResponseEntity<SliderResponseDTO> createSlider(@RequestBody SliderRequestDTO sliderRequest) {
        return ResponseEntity.ok(sliderService.createSlider(sliderRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SliderResponseDTO> updateSlider(@PathVariable Long id, @RequestBody SliderRequestDTO sliderRequest) {
        return ResponseEntity.ok(sliderService.updateSlider(id, sliderRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlider(@PathVariable Long id) {
        sliderService.deleteSlider(id);
        return ResponseEntity.ok().build();
    }
}