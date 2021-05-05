package com.accolite.demo.controller;

import java.util.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accolite.demo.model.Graph;
import com.accolite.demo.model.Orders;
import com.accolite.demo.service.OrdersService;

@RestController
@RequestMapping("/api/order")
public class OrdersController {
	@Autowired
	OrdersService orderservice;
	
	@PostMapping("/add")
    public Orders newOrder(@RequestBody Orders orderData) {       

		orderData.setDateOfPurchase(new Date());
	 	return orderservice.addOrder(orderData);

    }


	@GetMapping("/get/{id}")
    public Orders getOrders(@PathVariable Integer id) {

	    return orderservice.getOrderById(id);
    }

    @GetMapping("/get")
    public List<Orders> getAllOrders() {

        return orderservice.getAllOrders();
    }
    
    @GetMapping("/graph")
    public Graph getGraphData()
    {
    	return orderservice.getGraphData();
    }
    @PutMapping("/update/{id}/{status}")
    public ResponseEntity<Object> updateStatus(@PathVariable Integer id, @PathVariable String status ) {
        Orders it = orderservice.updateStatus(id, status);
        return ResponseEntity.ok(it);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateOrder(@PathVariable Integer id, @RequestBody Orders order ) {
        Orders it = orderservice.updateOrder(id, order);
        return ResponseEntity.ok(it);
    }
    
	
}
