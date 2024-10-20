package com.datn.be.service.impl;

import com.datn.be.dto.request.order.OrderCreateDTO;
import com.datn.be.dto.request.order.OrderUpdateDTO;
import com.datn.be.dto.response.ResultPaginationResponse;
import com.datn.be.dto.response.order.OrderResponse;
import com.datn.be.exception.ResourceNotFoundException;
import com.datn.be.model.Order;
import com.datn.be.model.OrderDetail;
import com.datn.be.repository.OrderDetailRepository;
import com.datn.be.repository.OrderRepository;
import com.datn.be.repository.ProductRepository;
import com.datn.be.repository.UserRepository;
import com.datn.be.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderDetailRepository orderDetailRepository;

    @Override
    public Order createOrder(OrderCreateDTO orderCreateDTO) {
        // Check if user exists before proceeding
        var user = userRepository.findById(orderCreateDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Validate all products and stock levels first
        var productMap = orderCreateDTO.getOrderDetails().stream().collect(
                java.util.stream.Collectors.toMap(
                        detail -> detail.getProductId(),
                        detail -> productRepository.findById(detail.getProductId())
                                .orElseThrow(() -> new ResourceNotFoundException("Product with id " + detail.getProductId() + " does not exist"))
                )
        );

        // Check stock levels
        orderCreateDTO.getOrderDetails().forEach(detail -> {
            var product = productMap.get(detail.getProductId());
            if (product.getQuantity() < detail.getQuantity()) {
                throw new IllegalStateException("Insufficient stock for product: " + product.getName());
            }
        });

        // If all validations pass, reduce stock quantities
        orderCreateDTO.getOrderDetails().forEach(detail -> {
            var product = productMap.get(detail.getProductId());
            product.setQuantity(product.getQuantity() - detail.getQuantity());
            // Assuming you have a soldQuantity field in your Product entity
            product.setSold(product.getSold() + detail.getQuantity());
            productRepository.save(product); // Save the updated product quantity
        });

        // Create the order
        Order order = orderRepository.save(Order.builder()
                .receiverName(orderCreateDTO.getReceiverName())
                .receiverAddress(orderCreateDTO.getReceiverAddress())
                .receiverPhone(orderCreateDTO.getReceiverPhone())
                .totalPrice(orderCreateDTO.getTotalPrice())
                .paymentMethod(orderCreateDTO.getPaymentMethod()) // Add payment method
                .status(orderCreateDTO.getStatus()) // Add status
                .user(user)
                .build());

        // Create the order details
        orderCreateDTO.getOrderDetails().forEach(detail -> {
            orderDetailRepository.save(
                    OrderDetail.builder()
                            .product(productMap.get(detail.getProductId()))
                            .order(order)
                            .productName(detail.getProductName())
                            .price(detail.getPrice())
                            .discount(detail.getDiscount()) // Add discount
                            .quantity(detail.getQuantity())
                            .build()
            );
        });

        return order;
    }

    @Override
    public List<OrderResponse> getOrdersByUserId(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found");
        }
        List<Order> orders = orderRepository.findAllByUserId(id);

        return orders.stream()
                .map(order -> {
                    List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(order.getId());

                    List<OrderResponse.OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                            .map(OrderResponse.OrderDetailResponse::fromOrderDetail)
                            .toList();

                    return OrderResponse.fromOrder(order, orderDetailResponses);
                })
                .toList();

    }

    @Override
    public ResultPaginationResponse findAll(Specification<Order> spec, Pageable pageable) {
        // Tìm tất cả các đơn hàng dựa trên Specification và Pageable
        Page<Order> orders = orderRepository.findAll(spec, pageable);

        // Tạo metadata cho phân trang
        ResultPaginationResponse.Meta meta = ResultPaginationResponse.Meta.builder()
                .total(orders.getTotalElements())
                .pages(orders.getTotalPages())
                .page(pageable.getPageNumber() + 1)  // Trang hiện tại
                .pageSize(pageable.getPageSize())    // Số phần tử trên mỗi trang
                .build();

        // Chuyển đổi từng Order sang OrderResponse kèm theo OrderDetailResponse
        List<OrderResponse> orderResponses = orders.getContent().stream()
                .map(order -> {
                    // Lấy các OrderDetail của Order hiện tại
                    List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(order.getId());

                    // Chuyển đổi từng OrderDetail sang OrderDetailResponse
                    List<OrderResponse.OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                            .map(OrderResponse.OrderDetailResponse::fromOrderDetail)
                            .toList();

                    // Tạo OrderResponse từ Order và danh sách OrderDetailResponse
                    return OrderResponse.fromOrder(order, orderDetailResponses);
                })
                .toList();

        // Trả về kết quả phân trang kèm theo danh sách các OrderResponse
        return ResultPaginationResponse.builder()
                .meta(meta)
                .result(orderResponses)  // Kết quả các đơn hàng
                .build();
    }

    @Override
    public List<OrderResponse> getAll() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream()
                .map(order -> {
                    List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(order.getId());

                    List<OrderResponse.OrderDetailResponse> orderDetailResponses = orderDetails.stream()
                            .map(OrderResponse.OrderDetailResponse::fromOrderDetail)
                            .toList();

                    return OrderResponse.fromOrder(order, orderDetailResponses);
                })
                .toList();
    }

    @Override
    public Order updateOrder(OrderUpdateDTO orderUpdateDTO) {
        Order currentOrder = orderRepository.findById(orderUpdateDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        currentOrder.setStatus(orderUpdateDTO.getStatus());
        currentOrder.setDescription(orderUpdateDTO.getDescription());
        return orderRepository.save(currentOrder);
    }

}