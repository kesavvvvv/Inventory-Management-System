package com.accolite.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accolite.demo.model.Orders;



public interface OrdersRepository extends JpaRepository<Orders, Integer>{

}
