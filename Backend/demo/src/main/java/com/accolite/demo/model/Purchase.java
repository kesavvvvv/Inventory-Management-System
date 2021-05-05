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
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer purchaseId;
    @Column
    private Integer productId;
    @Column
    private Integer purchaseQuantity;
    @Column
    private Integer supplierId;
//    @OneToOne
//    @JoinColumn(name="supplierId")
//    private Supplier supplierId;
    @Column
    private Date dateOfPurchase;
    @Column
    private String status;
    @Column
    private String paid;
    @Column
    private String paymentMethod;



}
