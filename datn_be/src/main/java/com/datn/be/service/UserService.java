package com.datn.be.service;

import com.datn.be.dto.request.user.UserRegisterRequestDTO;
import com.datn.be.dto.request.user.UserUpdateRequestDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.user.UserResponse;
import com.datn.be.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface UserService {
    UserResponse save(UserRegisterRequestDTO userRegisterRequestDTO);
    UserResponse update(UserUpdateRequestDTO userUpdateRequestDTO);
    void delete(Long id);
    ResultPaginationResponse findAll(Specification<User> spec, Pageable pageable);
    User findById(Long id);
    User findByEmail(String email);
    void updateUserToken(String token, String email);
    User getUserByEmailAndRefreshToken(String email, String refreshToken);
    String bulkCreateUser(List<UserRegisterRequestDTO> userRegisterRequestDTOS);
    long countAllUser();
}
