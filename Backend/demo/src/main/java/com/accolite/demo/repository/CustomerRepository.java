package com.accolite.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.accolite.demo.model.Customer;



public interface CustomerRepository extends JpaRepository<Customer, Integer>{

}
