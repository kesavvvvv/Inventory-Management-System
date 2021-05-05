package com.accolite.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accolite.demo.model.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer>{

}
