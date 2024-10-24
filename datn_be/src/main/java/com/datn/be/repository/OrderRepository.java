package com.datn.be.repository;

import com.datn.be.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    List<Order> findAllByUserId(Long userId);

    @Query(value = "select sum(orders.total_price) from orders where orders.status = 'DELIVERED'", nativeQuery = true)
    Double findTotalPrice();

    @Query(value = "SELECT " +
            " YEAR(created_at) AS year, " +
            " SUM(total_price) AS total_revenue" +
            " FROM orders" +
            " WHERE status = 'DELIVERED'" +
            " GROUP BY YEAR(created_at)", nativeQuery = true)
    List<Object[]> findTotalPriceByYear();

    @Query(value = "SELECT " +
            "    DATE_FORMAT(created_at, '%Y-%m') AS 'year_month', " +
            "    SUM(total_price) AS total_revenue" +
            " FROM orders" +
            " WHERE status = 'DELIVERED'" +
            " GROUP BY DATE_FORMAT(created_at, '%Y-%m')", nativeQuery = true)
    List<Object[]> findTotalPriceByMonth();

    @Query(value = "SELECT " +
            "    DATE(created_at) AS day, " +
            "    SUM(total_price) AS total_revenue" +
            " FROM orders" +
            " WHERE status = 'DELIVERED'" +
            "GROUP BY DATE(created_at)", nativeQuery = true)
    List<Object[]> findTotalPriceByDate();


    // Phương thức tìm kiếm đơn hàng theo năm
    @Query("SELECT o FROM Order o WHERE YEAR(o.createdAt) = :year")
    List<Order> findOrdersByYear(@Param("year") int year);

    // Phương thức tìm kiếm đơn hàng theo tháng
    @Query("SELECT o FROM Order o WHERE YEAR(o.createdAt) = :year AND MONTH(o.createdAt) = :month")
    List<Order> findOrdersByMonth(@Param("year") int year, @Param("month") int month);
}