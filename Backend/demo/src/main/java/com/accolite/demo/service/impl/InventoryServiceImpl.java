package com.accolite.demo.service.impl;

import com.accolite.demo.model.Inventory;
import com.accolite.demo.repository.InventoryRepository;
import com.accolite.demo.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    InventoryRepository inventoryRepository;
    @Override
    public Inventory getInventoryById(Integer id) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findById(id);

        if(inventoryOptional.isPresent()) {
            return inventoryOptional.get();

        }
        return null;
    }
    @Override
    public List<Inventory> getAllInventory() {
        List<Inventory> inventoryOptional = inventoryRepository.findAll();

        return inventoryOptional;
    }
    @Override
    public String addItem(Inventory items) {
        items.setOnhand(items.getAvailable());
//        Inventory newItem = 
        inventoryRepository.save(items);
        return "new Item added to Inventory";
    }

    @Override
    public Inventory updateQuantity(Integer id, Integer quantity) {
//        Optional<Inventory> inventoryOptional = inventoryRepository.findById(inventory.getItemId());
        Inventory i=inventoryRepository.getOne(id);

        i.setItemQuantity(quantity);
        return inventoryRepository.save(i);
    }
}
