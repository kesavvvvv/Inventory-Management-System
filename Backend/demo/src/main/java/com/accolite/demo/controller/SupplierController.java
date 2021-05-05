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


import com.accolite.demo.model.Supplier;

import com.accolite.demo.service.SupplierService;

@RestController
@RequestMapping("/api/supplier")
public class SupplierController {

	@Autowired
	SupplierService supplierservice;
	
	@PostMapping("/add")
    public Supplier newCustomer(@RequestBody Map<String, String> supplierData) {
		String name=supplierData.get("name");
	    String address=supplierData.get("address");
	    String mobile=supplierData.get("mobile");
	    String emailId=supplierData.get("emailId");
	    Supplier c=new Supplier();
	    c.setAddress(address);
	    c.setEmailId(emailId);
	    c.setMobile(mobile);
	    c.setName(name);
	    return supplierservice.addSupplier(c);
	    
	    
    }
	@GetMapping("/get/{id}")
    public Supplier getSupplier(@PathVariable Integer id) {
        return supplierservice.getSupplierById(id);

    }
	@GetMapping("/get")
    public List<Supplier> getAllSupplier() {
        return supplierservice.getAllSupplier();

    }
    @PutMapping("/update")
    public ResponseEntity<Object> updateSupplier(@RequestBody Supplier supplier) {
    	Supplier c = supplierservice.getSupplierById(supplier.getSupplierId());

        if(c == null) {
            return ResponseEntity.notFound().build();
        }

        Supplier it = supplierservice.updateSupplier(supplier);
        return ResponseEntity.ok(it);
    }

}
