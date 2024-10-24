package com.datn.be.service;



import com.datn.be.dto.response.statistics.CountAll;
import com.datn.be.dto.response.statistics.TotalPriceByDate;
import com.datn.be.dto.response.statistics.TotalPriceByMonth;
import com.datn.be.dto.response.statistics.TotalPriceByYear;
import com.datn.be.model.Order;

import java.util.List;

public interface StatisticsService {
    CountAll countAll();
    List<TotalPriceByYear> totalPriceByYear();
    List<TotalPriceByMonth> totalPriceByMonths();

    List<TotalPriceByDate> totalPriceByDate();
    List<Order> findOrdersByYear(int year);
    List<Order> findOrdersByMonth(int year, int month);
}
