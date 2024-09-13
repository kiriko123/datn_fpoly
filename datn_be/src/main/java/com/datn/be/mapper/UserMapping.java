package com.datn.be.mapper;

import com.datn.be.dto.request.user.UserRegisterRequestDTO;
import com.datn.be.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapping {
    User toUser(UserRegisterRequestDTO userRegisterRequestDTO);
}
