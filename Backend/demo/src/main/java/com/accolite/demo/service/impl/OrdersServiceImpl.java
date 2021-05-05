package com.accolite.demo.service.impl;


import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.accolite.demo.model.Graph;
import com.accolite.demo.model.Inventory;
import com.accolite.demo.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.accolite.demo.model.Orders;
import com.accolite.demo.repository.OrdersRepository;
import com.accolite.demo.service.OrdersService;
@Service
public class OrdersServiceImpl implements OrdersService {

	@Autowired
	OrdersRepository ordersrepository;
	@Autowired
	InventoryRepository inventoryRepository;
	
	@Override
	public Orders addOrder(Orders order) {
		
		return ordersrepository.save(order);
	}
	@Override
	public Orders getOrderById(Integer id) {
		Optional<Orders> orderOptional = ordersrepository.findById(id);
        if(orderOptional.isPresent()) {
            return orderOptional.get();
        }
        return null;
	}


        @Override
		public Orders updateStatus(Integer id, String status) {
			Orders orderOptional = ordersrepository.getOne(id);
			orderOptional.setStatus(status);
			Inventory inv = inventoryRepository.getOne(orderOptional.getProductId());

//			not confirmed:
//			does not effect the product state
//		not confirmed -> confirmed :
//			add the quantity ordered to outgoing
//			subtract quantity from available
//		confirmed -> shipped :
//			subtract from outgoing 
//			subtract from on hand (as the product has left your hand for shipping)
//		shipped -> completed:
//			no change, but can happen only if the order status is paid, have option to change from not paid to paid

			if(status.equals("confirmed")){

				inv.setOutgoing(inv.getOutgoing() + orderOptional.getOrderQuantity());
				inv.setAvailable(inv.getAvailable() - orderOptional.getOrderQuantity());
			}

			if(status.equals("shipped")){
				if(inv.getOutgoing() > 0) {
					inv.setOutgoing(inv.getOutgoing() - orderOptional.getOrderQuantity());
					inv.setOnhand(inv.getOnhand() - orderOptional.getOrderQuantity());
				}
			}


			inv.setOnhand(inv.getAvailable() + inv.getOutgoing());
			return 	ordersrepository.save(orderOptional);
		}

	@Override
	public List<Orders> getAllOrders() {
		List<Orders> inventoryOptional = ordersrepository.findAll();

		return inventoryOptional;
	}
	@Override
	public Orders updateOrder(Integer id, Orders order) {
		Orders oO = ordersrepository.getOne(id);
		oO.setCustomerId(order.getCustomerId());
		oO.setOrderQuantity(order.getOrderQuantity());
		oO.setPaid(order.getPaid());
		oO.setPaymentMethod(order.getPaymentMethod());
		oO.setProductId(order.getProductId());
		oO.setDateOfPurchase(new Date());
		String status=order.getStatus();
		oO.setStatus(status);
		Inventory inv = inventoryRepository.getOne(oO.getProductId());
		if(status.equals("confirmed")){

			inv.setOutgoing(inv.getOutgoing() + oO.getOrderQuantity());
			inv.setAvailable(inv.getAvailable() - oO.getOrderQuantity());
		}

		if(status.equals("shipped")){

			if(inv.getOutgoing() > 0) {
				inv.setOutgoing(inv.getOutgoing() - oO.getOrderQuantity());
				inv.setOnhand(inv.getOnhand() - oO.getOrderQuantity());
			}
		}


		inv.setOnhand(inv.getAvailable() + inv.getOutgoing());
		return ordersrepository.save(oO);
	}
	@Override
	public Graph getGraphData() {
		// TODO Auto-generated method stub
		Graph g=new Graph();
		Integer revenue=0;
		Integer unitsSold=0;
		Integer noOfOrders=0;
		List<Orders> lo=getAllOrders();
		noOfOrders=lo.size();
		for(Orders o:lo) {
			if(o.getPaid().equals("Yes"))
				unitsSold+=o.getOrderQuantity();
		}
		for(Orders o:lo) {
			if(o.getPaid().equals("Yes")) {
				Inventory inv = inventoryRepository.getOne(o.getProductId());
				revenue+=((inv.getSelling_price()-inv.getPurchase_price())*o.getOrderQuantity());
			}
		}
		g.setNoOfOrders(noOfOrders);
		g.setRevenue(revenue);
		g.setUnitsSold(unitsSold);
		return g;
	}
}
