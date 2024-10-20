package com.datn.be.controller;

import com.datn.be.model.User;
import com.datn.be.repository.UserRepository;
import com.datn.be.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Đổi @Controller thành @RestController để trả về JSON
@RequestMapping("/api/v1/auth")
public class PasswordResetController {
    private final AccountService signupService;
    private final UserRepository userRepository;

    public PasswordResetController(AccountService signupService, UserRepository userRepository) {
        this.signupService = signupService;
        this.userRepository = userRepository;
    }

    @GetMapping("/reset-password")
    public ResponseEntity<?> checkResetCode(@RequestParam("code") String code) {
        User user = userRepository.findByVerificationCode(code);

        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid verification code");
        }

        // Nếu code hợp lệ, trả về 200 OK với message
        return ResponseEntity.ok("Verification code is valid");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("code") String code,
                                           @RequestParam("password") String password,
                                           @RequestParam("confirmPassword") String confirmPassword) {
        if (!password.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body("Mật khẩu không chính xác!");
        }

        try {
            signupService.resetPassword(code, password);
            return ResponseEntity.ok("Đổi mật khẩu thành công!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
