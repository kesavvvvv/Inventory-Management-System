package com.accolite.demo.controller;

import com.accolite.demo.model.Graph;
import com.accolite.demo.model.Inventory;
import com.accolite.demo.model.Orders;
import com.accolite.demo.service.OrdersService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Order;
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
public class OrderControllerTest {

    @InjectMocks
    OrdersController ordersController;

    @Mock
    OrdersService ordersService;

    @Test
    void newOrderTest() {

        Orders orders = new Orders(1, 20, 1, 1, new Date(), "not confirmed", "Yes", "Card");

        Mockito.when(ordersService.addOrder(Mockito.any(Orders.class))).thenReturn(orders);

        Orders order2 = ordersController.newOrder(orders);
        Assertions.assertEquals(orders, order2);
    }

    @Test
    void getOrderTest() {
        Orders orders = new Orders();
        Mockito.when(ordersService.getOrderById(Mockito.anyInt())).thenReturn(orders);

        Orders response = ordersController.getOrders(1);
        Assertions.assertEquals(orders, response);

    }

    @Test
    void getGraphTest() {
        Graph g = new Graph();
        List<Orders> lo = ordersService.getAllOrders();

        Mockito.when(ordersService.getGraphData()).thenReturn(g);

        Graph response = ordersController.getGraphData();

        Assertions.assertEquals(g, response);
    }

    @Test
    void updateOrderTest() {

        Orders orders = new Orders(1, 40, 1, 1, new Date(), "not confirmed", "Yes", "Card");
        Mockito.when(ordersService.updateOrder(Mockito.anyInt(), Mockito.any(Orders.class))).thenReturn(orders);

        ResponseEntity<Object> order2 = ordersController.updateOrder(1, orders);
        Assertions.assertEquals(orders, order2.getBody());


    }


}
