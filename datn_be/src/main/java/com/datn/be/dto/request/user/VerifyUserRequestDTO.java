package com.datn.be.dto.request.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyUserRequestDTO {
    private String email;
    private String verificationCode;
}
