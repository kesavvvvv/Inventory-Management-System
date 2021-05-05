package com.accolite.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accolite.demo.model.Customer;

import com.accolite.demo.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
	@Autowired
	CustomerService customerservice;
	
	@PostMapping("/add")
    public Customer newCustomer(@RequestBody Map<String, String> customerData) {
		String name=customerData.get("name");
	    String address=customerData.get("address");
	    String mobile=customerData.get("mobile");
	    String emailId=customerData.get("emailId");
	    Customer c=new Customer();
	    c.setAddress(address);
	    c.setEmailId(emailId);
	    c.setMobile(mobile);
	    c.setName(name);
	    return customerservice.addCustomer(c);
	    
	    
    }
	@GetMapping("/get/{id}")
    public Customer getCustomer(@PathVariable Integer id) {
		
        return customerservice.getCustomerById(id);

    }
	@GetMapping("/get")
    public List<Customer> getAllCustomer() {
		
        return customerservice.getAllCustomer();

    }
    @PutMapping("/update")
    public ResponseEntity<Object> updateCustomer(@RequestBody Customer customer) {
        Customer c = customerservice.getCustomerById(customer.getCustomerId());

        if(c == null) {
            return ResponseEntity.notFound().build();
        }

        Customer it = customerservice.updateCustomer(customer);
        return ResponseEntity.ok(it);
    }

}
