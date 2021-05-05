package com.accolite.demo.service;

import java.util.List;

import com.accolite.demo.model.Customer;


public interface CustomerService {

	Customer addCustomer(Customer c);

	Customer getCustomerById(Integer id);

	Customer updateCustomer(Customer customer);

	List<Customer> getAllCustomer();

}
