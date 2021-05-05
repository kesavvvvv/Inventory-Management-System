import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/order.service';
import { InventoryService } from 'src/app/inventory.service';
import { CustomerService } from 'src/app/customer.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css'],
})
export class OrderDialogComponent implements OnInit {
  constructor(
    private service: OrderService,
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    private inventory: InventoryService,
    private customer: CustomerService
  ) {}

  dialogformgroup = new FormGroup({
    orderId: new FormControl(''),
    productId: new FormControl('', Validators.required),
    customerId: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    orderQuantity: new FormControl('', Validators.required),
    paid: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),

    // itemName: any;
    // itemQuantity: any;
  });
  products: any;
  customers: any;
  ngOnInit(): void {
    this.products = this.inventory.products;
    this.inventory.inventoryReports().subscribe((result) => {
      this.products = result;
      console.log(this.products);
    });

    this.customers = this.customer.customers;
    this.customer.customerReports().subscribe((result2) => {
      this.customers = result2;
      console.log(this.customers);
    });
  }

  onNoClick(): void {
    // console.log(this.itemName);

    // if (!this.itemName && !this.itemQuantity) {
    //   console.log('empty');
    //   this.dialogRef.close();
    //   return;
    // }
    console.log(this.dialogformgroup.valid);
    if (this.dialogformgroup.valid) {
      console.log(this.dialogformgroup.getRawValue());
      this.service.addReports(this.dialogformgroup.getRawValue());
      // this.service.updateReports(this.dialogformgroup.getRawValue());
      // this.service.updateReports(this.itemName, this.itemQuantity);
      //api call here to update the table and  give the values of itmeid,itemname and item quantity in it etc.
      this.dialogRef.close();
    }
  }
  close(): void {
    this.dialogRef.close();
  }
}
