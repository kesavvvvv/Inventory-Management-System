package com.accolite.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Supplier {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer supplierId;

    @Column
    private String name;

    @Column
    private String address;
    
    @Column
    private String mobile;
    
    @Column
    private String emailId;
    
//    @OneToOne(mappedBy="supplierId")
//    @JsonIgnore
//    private Purchase purchase;

}
