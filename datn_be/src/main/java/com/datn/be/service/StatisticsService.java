package com.datn.be.service;



import com.datn.be.dto.response.statistics.CountAll;
import com.datn.be.dto.response.statistics.TotalPriceByDate;
import com.datn.be.dto.response.statistics.TotalPriceByMonth;
import com.datn.be.dto.response.statistics.TotalPriceByYear;

import java.util.List;

public interface StatisticsService {
    CountAll countAll();
    List<TotalPriceByYear> totalPriceByYear();
    List<TotalPriceByMonth> totalPriceByMonths();

    List<TotalPriceByDate> totalPriceByDate();
}
