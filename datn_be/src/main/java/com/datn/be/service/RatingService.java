package com.datn.be.service;

import com.datn.be.model.Rating;

import java.util.List;

public interface RatingService {
    List<Rating> getRatingsByProduct(Long productId);

    Rating addRating(Long productId, Rating rating, String username); // Thêm tham số username

    Rating updateRating(Long id, Rating rating);

    void deleteRating(Long id);
}
