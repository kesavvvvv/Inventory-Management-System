package com.accolite.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accolite.demo.model.Customer;

import com.accolite.demo.repository.CustomerRepository;
import com.accolite.demo.service.CustomerService;
@Service
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	CustomerRepository customerrepository;
	@Override
	public Customer addCustomer(Customer c) {
		return customerrepository.save(c);
	}
	@Override
	public Customer getCustomerById(Integer id) {
		 Optional<Customer> customerOptional = customerrepository.findById(id);
       if(customerOptional.isPresent()) {
    	   System.out.println(customerOptional.get());
           return customerOptional.get();
       }
       return null;
	}
	@Override
	public Customer updateCustomer(Customer customer) {
//		Optional<Customer> customerOptional = customerrepository.findById(customer.getCustomerId());
		Customer c=customerrepository.getOne(customer.getCustomerId());
        c.setAddress(customer.getAddress());
        c.setEmailId(customer.getEmailId());
        c.setMobile(customer.getMobile());
        c.setName(customer.getName());
        return customerrepository.save(c);
	}
	@Override
	public List<Customer> getAllCustomer() {
		return customerrepository.findAll();
		
	}


}
