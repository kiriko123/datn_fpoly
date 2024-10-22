package com.datn.be.service;

import com.datn.be.dto.request.order.OrderCreateDTO;
import com.datn.be.dto.request.order.OrderUpdateDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.order.OrderResponse;
import com.datn.be.model.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface OrderService {
    Order createOrder(OrderCreateDTO orderCreateDTO);
    List<OrderResponse> getOrdersByUserId(Long id);
    ResultPaginationResponse findAll(Specification<Order> spec, Pageable pageable);
    List<OrderResponse> getAll();
    Order updateOrder(OrderUpdateDTO orderUpdateDTO);
}
