package com.datn.be.dto.request.user;

import com.datn.be.util.constant.GenderEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminBulkCreateUserDTO {

    private String name;

    private String firstName;

    private String email;

    private String password;

    private int age;

    private GenderEnum gender;

    private String address;

    private String phoneNumber;
}
