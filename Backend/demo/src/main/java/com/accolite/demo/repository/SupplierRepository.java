package com.accolite.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accolite.demo.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer>{

}
