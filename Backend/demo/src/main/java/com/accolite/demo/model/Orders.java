package com.accolite.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;
        
    @Column
    private Integer orderQuantity;
    
    @Column
    private Integer customerId;
//    @ManyToOne
//    @JoinColumn(name="customerId")
//    private Customer customerId;
    
    @Column
    private Integer productId;
    
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="product")
//    private Inventory product;
//    
    @Column
    private Date DateOfPurchase;
    
    @Column
    private String status;
    @Column
    private String paid;
    @Column
    private String paymentMethod;



}
