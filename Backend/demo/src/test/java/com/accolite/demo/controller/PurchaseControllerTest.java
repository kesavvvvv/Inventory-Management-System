package com.accolite.demo.controller;

import com.accolite.demo.model.Graph;
import com.accolite.demo.model.Orders;
import com.accolite.demo.model.Purchase;
import com.accolite.demo.service.PurchaseService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class PurchaseControllerTest {

    @InjectMocks
    PurchaseController purchaseController;

    @Mock
    PurchaseService purchaseService;

    @Test
    void newPurchaseTest() {

        Purchase purchase = new Purchase(1, 20, 1, 1, new Date(), "not confirmed", "Yes", "Card");

        Mockito.when(purchaseService.addPurchase(Mockito.any(Purchase.class))).thenReturn(purchase);

        Purchase purchase2 = purchaseController.newPurchase(purchase);
        Assertions.assertEquals(purchase, purchase2);
    }

    @Test
    void getPurchaseTest() {

        Purchase purchase = new Purchase();
        Mockito.when(purchaseService.getPurchaseById(Mockito.anyInt())).thenReturn(purchase);

        Purchase response = purchaseController.getPurchase(1);
        Assertions.assertEquals(purchase, response);

    }

    @Test
    void updatePurchaseTest() {

        Purchase purchase = new Purchase(1, 40, 1, 1, new Date(), "not confirmed", "Yes", "Card");
        Mockito.when(purchaseService.updatePurchase(Mockito.anyInt(), Mockito.any(Purchase.class))).thenReturn(purchase);

        ResponseEntity<Object> order2 = purchaseController.updatePurchase(1, purchase);
        Assertions.assertEquals(purchase, order2.getBody());


    }


}
