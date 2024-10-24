package com.datn.be.service.impl;

import com.datn.be.dto.response.statistics.CountAll;
import com.datn.be.dto.response.statistics.TotalPriceByDate;
import com.datn.be.dto.response.statistics.TotalPriceByMonth;
import com.datn.be.dto.response.statistics.TotalPriceByYear;
import com.datn.be.model.Order;
import com.datn.be.repository.OrderRepository;
import com.datn.be.repository.UserRepository;
import com.datn.be.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Override
    public CountAll countAll() {
        return CountAll.builder()
                .totalOrder(orderRepository.count())
                .totalUser(userRepository.count())
                .totalPrice(orderRepository.findTotalPrice())
                .build();
    }

    @Override
    public List<TotalPriceByYear> totalPriceByYear() {

        List<Object[]> objects = orderRepository.findTotalPriceByYear();

        return objects.stream().map(o -> new TotalPriceByYear(String.valueOf(o[0]), (Double) o[1])).toList();
    }

    @Override
    public List<TotalPriceByMonth> totalPriceByMonths() {
        List<Object[]> objects = orderRepository.findTotalPriceByMonth();

        return objects.stream().map(o -> new TotalPriceByMonth(String.valueOf(o[0]), (Double) o[1])).toList();
    }

    @Override
    public List<TotalPriceByDate> totalPriceByDate() {
        List<Object[]> objects = orderRepository.findTotalPriceByDate();
        return objects.stream().map(o -> new TotalPriceByDate(String.valueOf(o[0]), (Double) o[1])).toList();
    }

    @Override
    public List<Order> findOrdersByYear(int year) {
        return orderRepository.findOrdersByYear(year);
    }

    @Override
    public List<Order> findOrdersByMonth(int year, int month) {
        return orderRepository.findOrdersByMonth(year, month);
    }
}
