package com.accolite.demo.controller;

import java.util.Date;
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


import com.accolite.demo.model.Purchase;

import com.accolite.demo.service.PurchaseService;
@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {

	@Autowired
	PurchaseService purchaseservice;
	
	@PostMapping("/add")
    public Purchase newPurchase(@RequestBody Purchase purchaseData) {       

		purchaseData.setDateOfPurchase(new Date());
		return purchaseservice.addPurchase(purchaseData);
    }
	@GetMapping("/get/{id}")
    public Purchase getPurchase(@PathVariable Integer id) {
        return purchaseservice.getPurchaseById(id);

    }

    @GetMapping("/get")
    public List<Purchase> getAllPurchase() {

        return purchaseservice.getAllPurchase();
    }
//	@PutMapping("/update")
//    public ResponseEntity<Object> updateStatus(@RequestBody Purchase purchase) {
//        Purchase purchase1 = purchaseservice.getPurchaseById(purchase.getPurchaseId());
//
//        if(purchase1 == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        Purchase it = purchaseservice.updateStatus(purchase);
//        return ResponseEntity.ok(it);
//    }

    @PutMapping("/update/{id}/{status}")
    public ResponseEntity<Object> updateStatus(@PathVariable Integer id, @PathVariable String status ) {
        Purchase it = purchaseservice.updateStatus(id, status);
        return ResponseEntity.ok(it);

    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updatePurchase(@PathVariable Integer id, @RequestBody Purchase purchase ) {
        Purchase it = purchaseservice.updatePurchase(id, purchase);
        return ResponseEntity.ok(it);

    }
	
}
