package com.accolite.demo.service;


import com.accolite.demo.model.Purchase;

import java.util.List;

public interface PurchaseService {

	Purchase addPurchase(Purchase purchase);

	Purchase getPurchaseById(Integer id);

	Purchase updateStatus(Integer id,String status);

	public List<Purchase> getAllPurchase();

	Purchase updatePurchase(Integer id, Purchase purchase);

}
