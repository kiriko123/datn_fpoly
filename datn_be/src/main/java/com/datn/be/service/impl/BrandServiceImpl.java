package com.datn.be.service.impl;

import com.datn.be.dto.request.brand.BrandCreateRequestDTO;
import com.datn.be.dto.request.brand.BrandUpdateRequestDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.brand.BrandRespone;
import com.datn.be.dto.response.user.UserResponse;
import com.datn.be.exception.InvalidDataException;
import com.datn.be.exception.ResourceNotFoundException;
import com.datn.be.mapper.BrandMapping;
import com.datn.be.model.Brand;
import com.datn.be.model.User;
import com.datn.be.repository.BrandRepository;
import com.datn.be.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final BrandMapping brandMapping;


    @Override
    public ResultPaginationResponse getAllBrands(Specification<Brand> spec, Pageable pageable) {
        Page<Brand> brands = brandRepository.findAll(spec, pageable);

        ResultPaginationResponse.Meta meta = ResultPaginationResponse.Meta.builder()
                .total(brands.getTotalElements())
                .pages(brands.getTotalPages())
                .page(pageable.getPageNumber() + 1)
                .pageSize(pageable.getPageSize())
                .build();

        List<BrandRespone> brandResponses = brands.getContent().stream().map(BrandRespone::fromBrandToBrandRespone).toList();

        return ResultPaginationResponse.builder()
                .meta(meta)
                .result(brandResponses)
                .build();
    }

    @Override
    public BrandRespone create(BrandCreateRequestDTO brandCreateRequestDTO) {
        if(brandRepository.existsByName(brandCreateRequestDTO.getName())){
            throw new InvalidDataException("Brand name already exist");
        }
    Brand brand = Brand.builder()
            .name(brandCreateRequestDTO.getName())
            .description(brandCreateRequestDTO.getDescription())
            .thumbnail(brandCreateRequestDTO.getThumbnail())
            .active(true)
            .build();
    return BrandRespone.fromBrandToBrandRespone(brandRepository.save(brand));
    }

    @Override
    public BrandRespone update(BrandUpdateRequestDTO brandUpdateRequestDTO) {

        Brand brand = this.getBrandById(brandUpdateRequestDTO.getId());

        brand.setName(brandUpdateRequestDTO.getName());
        brand.setDescription(brandUpdateRequestDTO.getDescription());
        brand.setThumbnail(brandUpdateRequestDTO.getThumbnail());
        return brandMapping.fromBrandToBrandResponse(brandRepository.save(brand));
    }

    @Override
    public void delete(Long id) {
        Brand brand = getBrandById(id);
        brand.setActive(false);
        brandRepository.save(brand);
    }

    @Override
    public Brand getBrandById(Long id) {
        return brandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
    }


}
