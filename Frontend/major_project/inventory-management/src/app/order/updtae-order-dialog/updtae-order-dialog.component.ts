import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/order.service';
import { Inject } from '@angular/core';
import { InventoryService } from 'src/app/inventory.service';
import { CustomerService } from 'src/app/customer.service';

@Component({
  selector: 'app-updtae-order-dialog',
  templateUrl: './updtae-order-dialog.component.html',
  styleUrls: ['./updtae-order-dialog.component.css'],
})
export class UpdtaeOrderDialogComponent implements OnInit {
  constructor(
    private service: OrderService,
    public dialogRef: MatDialogRef<UpdtaeOrderDialogComponent>,
    private inventory: InventoryService,
    private customer: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  dialogformgroup = new FormGroup({
    orderId: new FormControl(this.data.orderId, Validators.required),
    productId: new FormControl(this.data.purchaseId, Validators.required),
    customerId: new FormControl(this.data.customerId, Validators.required),
    status: new FormControl(this.data.status, Validators.required),
    orderQuantity: new FormControl(
      this.data.orderQuantity,
      Validators.compose([Validators.required, Validators.min(10)])
    ),
    paid: new FormControl(this.data.paid, Validators.required),
    paymentMethod: new FormControl(
      this.data.paymentMethod,
      Validators.required
    ),
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

  onNoClick(updatedStatus: string): void {
    if (this.dialogformgroup.valid) {
      //call update service here.
      if (updatedStatus === 'update') {
        this.service.updateReports(this.dialogformgroup.getRawValue());
      } else {
        this.service.updateReports({
          ...this.dialogformgroup.getRawValue(),
          status: updatedStatus,
        });
      }
      // console.log(this.dialogformgroup.getRawValue());
      this.dialogRef.close();
    }
  }
  close(): void {
    this.dialogRef.close();
  }
}
