package com.accolite.demo.controller;

import com.accolite.demo.model.Inventory;
import com.accolite.demo.repository.InventoryRepository;
import com.accolite.demo.service.InventoryService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class InventoryControllerTest {

    @InjectMocks
    InventoryController inventoryController;

    @Mock
    InventoryService inventoryService;

    @Test
    void addItemTest() {
        Mockito.when(inventoryService.addItem(Mockito.any(Inventory.class))).thenReturn("new Item added to Inventory");
        Inventory inventory = new Inventory(1, "Orange", 20, 20, 20 , 20 , 20 , 20 , 20);
        ResponseEntity<String> responseEntity = inventoryController.newInventory(inventory);
        Assertions.assertEquals("new Item added to Inventory", responseEntity.getBody());
    }

    @Test
    void getInventoryTest() {
        Inventory inventory = new Inventory();
        Mockito.when(inventoryService.getInventoryById(Mockito.anyInt())).thenReturn(inventory);

        Inventory response = inventoryController.getInventory(1);
        Assertions.assertEquals(inventory, response);

    }
}
