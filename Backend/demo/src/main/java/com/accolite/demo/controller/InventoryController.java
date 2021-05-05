package com.accolite.demo.controller;

import com.accolite.demo.model.Inventory;
import com.accolite.demo.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    InventoryService inventoryService;

    @GetMapping("/get/{id}")
    public Inventory getInventory(@PathVariable Integer id) {
        return inventoryService.getInventoryById(id);

    }

    @GetMapping("/get")
    public List<Inventory> getAllInventory() {

        return inventoryService.getAllInventory();
    }

    @PostMapping("/add")
    public ResponseEntity<String> newInventory(@RequestBody Inventory itemData) {
    	itemData.setIncoming(0);
    	itemData.setOutgoing(0);
        String ord = inventoryService.addItem(itemData);
        return ResponseEntity.ok(ord);
    }

//    @PutMapping("/update/{id}/{quantity}")
//    public ResponseEntity<Object> updateQuantity(@PathVariable Integer id, @PathVariable Integer quantity) {
//
//
//        Inventory items = inventoryService.getInventoryById(id);
//
//        if(items == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        Inventory it = inventoryService.updateQuantity(id, quantity);
//        return ResponseEntity.ok(it);
//    }

}
