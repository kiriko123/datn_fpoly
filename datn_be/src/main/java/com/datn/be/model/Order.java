package com.datn.be.model;

import com.datn.be.util.SecurityUtil;
import com.datn.be.util.constant.GenderEnum;
import com.datn.be.util.constant.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String fullName;

    String email;

    String phoneNumber;

    String address;

    float totalMoney;

    String shippingMethod;

    String shippingAddress;

    Instant shippingDate;

    @Enumerated(EnumType.STRING)
    OrderStatus status;

    String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    PaymentMethod paymentMethod;

    Instant createdAt;
    String createdBy;



    @PrePersist
    public void handleBeforeCreate() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleBeforeUpdate() {

    }
}
