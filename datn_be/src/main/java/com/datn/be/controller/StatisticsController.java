package com.datn.be.controller;

import com.datn.be.model.Order;
import com.datn.be.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/api/v1/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/count-all")
    public ResponseEntity<?> countAll() {
        log.info("countAll");
        return ResponseEntity.ok(statisticsService.countAll());
    }

    @GetMapping("/total-price-by-year")
    public ResponseEntity<?> totalPriceByYear() {
        return ResponseEntity.ok(statisticsService.totalPriceByYear());
    }
    @GetMapping("/total-price-by-month")
    public ResponseEntity<?> totalPriceByMonth() {
        return ResponseEntity.ok(statisticsService.totalPriceByMonths());
    }
    @GetMapping("/total-price-by-date")
    public ResponseEntity<?> totalPriceByDate() {
        return ResponseEntity.ok(statisticsService.totalPriceByDate());
    }

    @GetMapping("/orders-by-year/{year}")
    public ResponseEntity<List<Order>> findOrdersByYear(@PathVariable int year) {
        return ResponseEntity.ok(statisticsService.findOrdersByYear(year));
    }

    @GetMapping("/orders-by-month/{year}/{month}")
    public ResponseEntity<List<Order>> findOrdersByMonth(@PathVariable int year, @PathVariable int month) {
        return ResponseEntity.ok(statisticsService.findOrdersByMonth(year, month));
    }
}
