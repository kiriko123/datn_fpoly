package com.datn.be.util.annotation;


import com.datn.be.util.constant.PhoneNumberValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PhoneNumberValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface PhoneNumber {
    String message() default "Số điện thoại không hợp lệ.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
