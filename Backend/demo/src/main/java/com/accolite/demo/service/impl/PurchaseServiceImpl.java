package com.accolite.demo.service.impl;


import java.util.List;
import java.util.Optional;

import com.accolite.demo.model.Inventory;

import com.accolite.demo.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.accolite.demo.model.Purchase;
import com.accolite.demo.repository.PurchaseRepository;
import com.accolite.demo.service.PurchaseService;

@Service
public class PurchaseServiceImpl implements PurchaseService {

	@Autowired
	PurchaseRepository purchaserepository;
	@Autowired
	InventoryRepository inventoryRepository;
	@Override
	public Purchase addPurchase(Purchase purchase) {
		return purchaserepository.save(purchase);
	}
	@Override
	public Purchase getPurchaseById(Integer id) {
		Optional<Purchase> purchaseOptional = purchaserepository.findById(id);
        if(purchaseOptional.isPresent()) {
            return purchaseOptional.get();
        }
        return null;
	}
	@Override
	public Purchase updateStatus(Integer id,String status) {
		Purchase purchaseOptional = purchaserepository.getOne(id);
		System.out.println(purchaseOptional);
		purchaseOptional.setStatus(status);
		Inventory inv = inventoryRepository.getOne(purchaseOptional.getProductId());

		if(status.equals("raised")){

			inv.setIncoming(inv.getIncoming() + purchaseOptional.getPurchaseQuantity());
		}

		if(status.equals("received")){

			if(inv.getIncoming() > 0) {
				System.out.println(inv.getIncoming());
				inv.setIncoming(inv.getIncoming() - purchaseOptional.getPurchaseQuantity());
				inv.setAvailable(inv.getAvailable() + purchaseOptional.getPurchaseQuantity());
			}
		}


		inv.setOnhand(inv.getAvailable() + inv.getOutgoing());
		return 	purchaserepository.save(purchaseOptional);
	}

	@Override
	public List<Purchase> getAllPurchase() {
		List<Purchase> inventoryOptional = purchaserepository.findAll();

		return inventoryOptional;
	}
	@Override
	public Purchase updatePurchase(Integer id, Purchase purchase) {
		Purchase po = purchaserepository.getOne(id);
		String status=purchase.getStatus();
		po.setStatus(status);
		po.setPaymentMethod(purchase.getPaymentMethod());
		po.setPaid(purchase.getPaid());
		po.setPurchaseQuantity(purchase.getPurchaseQuantity());
		
//		purchaseOptional.setStatus(status);
		Inventory inv = inventoryRepository.getOne(po.getProductId());

		if(status.equals("raised")){

			inv.setIncoming(inv.getIncoming() + po.getPurchaseQuantity());
		}

		if(status.equals("received")){
			if(inv.getIncoming() > 0) {
				inv.setIncoming(inv.getIncoming() - po.getPurchaseQuantity());
				inv.setAvailable(inv.getAvailable() + po.getPurchaseQuantity());
			}
		}


		inv.setOnhand(inv.getAvailable() + inv.getOutgoing());
		return purchaserepository.save(po);
	}

}
