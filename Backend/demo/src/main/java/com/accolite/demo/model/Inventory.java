package com.accolite.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    @Column
    private String itemName;

    @Column
    private Integer itemQuantity;

    @Column
    private Integer outgoing;

    @Column
    private Integer onhand;

    @Column
    private Integer incoming;

    @Column
    private Integer available;

    @Column
    private Integer purchase_price;

    @Column
    private Integer selling_price;
    
//    @OneToOne(mappedBy = "itemId", cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY, optional = false)
//    private Orders order;
    



}
