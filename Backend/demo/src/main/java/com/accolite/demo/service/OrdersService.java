package com.accolite.demo.service;


import com.accolite.demo.model.Graph;
import com.accolite.demo.model.Orders;

import java.util.List;

public interface OrdersService {

	public Orders addOrder(Orders order);

	public Orders getOrderById(Integer id);

	public Orders updateStatus(Integer id, String status);

	public List<Orders> getAllOrders();

	public Orders updateOrder(Integer id, Orders order);

	public Graph getGraphData();

}
