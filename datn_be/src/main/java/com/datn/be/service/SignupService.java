package com.datn.be.service;

import com.datn.be.dto.request.user.RegisterRequestDTO;
import com.datn.be.dto.response.user.UserResponse;
import com.datn.be.model.User;

public interface SignupService {
    UserResponse register(RegisterRequestDTO registerRequestDTO);
    void verifyUser(String verificationCode);
    void resendVerificationCode(String email);
    void sendVerificationEmail(User user);
}
