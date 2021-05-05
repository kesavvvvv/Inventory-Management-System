package com.accolite.demo.service;


import java.util.List;

import com.accolite.demo.model.Supplier;

public interface SupplierService {

	Supplier addSupplier(Supplier c);

	Supplier getSupplierById(Integer id);

	Supplier updateSupplier(Supplier supplier);

	List<Supplier> getAllSupplier();

}
