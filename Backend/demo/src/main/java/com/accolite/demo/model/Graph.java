package com.accolite.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Graph {
	private Integer revenue;
	private Integer unitsSold;
	private Integer noOfOrders;
}
