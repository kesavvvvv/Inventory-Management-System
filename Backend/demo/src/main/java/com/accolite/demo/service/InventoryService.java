package com.accolite.demo.service;

import com.accolite.demo.model.Inventory;

import java.util.List;

public interface InventoryService {

    public Inventory getInventoryById(Integer id);

    public String addItem(Inventory items);

    Inventory updateQuantity(Integer id, Integer quantity);

    public List<Inventory> getAllInventory();
}
