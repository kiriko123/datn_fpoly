package com.datn.be.dto.request.order;

import com.datn.be.util.constant.OrderStatus;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserOrderUpdateDTO {
    long id;
    String address;
    OrderStatus currentStatus;
    OrderStatus newStatus;
    String description;
}
