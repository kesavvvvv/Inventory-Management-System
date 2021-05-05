package com.accolite.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.accolite.demo.model.Supplier;
import com.accolite.demo.repository.SupplierRepository;
import com.accolite.demo.service.SupplierService;
@Service
public class SupplierServiceImpl implements SupplierService{

	@Autowired
	SupplierRepository supplierrepository;
	@Override
	public Supplier addSupplier(Supplier c) {
		return supplierrepository.save(c);
	}

	@Override
	public Supplier getSupplierById(Integer id) {
		Optional<Supplier> supplierOptional = supplierrepository.findById(id);
	      if(supplierOptional.isPresent()) {
	          return supplierOptional.get();
	      }
	      return null;
	}

	@Override
	public Supplier updateSupplier(Supplier supplier) {
//		Optional<Supplier> supplierOptional = supplierrepository.findById(supplier.getSupplierId());
		Supplier c=supplierrepository.getOne(supplier.getSupplierId());
        c.setAddress(supplier.getAddress());
        c.setEmailId(supplier.getEmailId());
        c.setMobile(supplier.getMobile());
        c.setName(supplier.getName());
        return supplierrepository.save(c);
	}

	@Override
	public List<Supplier> getAllSupplier() {
		// TODO Auto-generated method stub
		return supplierrepository.findAll();
	}


}
