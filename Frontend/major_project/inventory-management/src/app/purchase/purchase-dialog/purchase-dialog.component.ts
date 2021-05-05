import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from 'src/app/order.service';
import { PurchaseService } from 'src/app/purchase.service';
import { InventoryService } from 'src/app/inventory.service';
import { SupplierService } from 'src/app/supplier.service';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css'],
})
export class PurchaseDialogComponent implements OnInit {
  constructor(
    private service: PurchaseService,
    public dialogRef: MatDialogRef<PurchaseDialogComponent>,
    private inventory: InventoryService,
    private supplier: SupplierService
  ) {}

  dialogformgroup = new FormGroup({
    purchaseId: new FormControl(''),
    productId: new FormControl('', Validators.required),
    supplierId: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    purchaseQuantity: new FormControl('', Validators.required),
    paid: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),
    // itemName: any;
    // itemQuantity: any;
  });

  products: any;
  suppliers: any;
  ngOnInit(): void {
    this.products = this.inventory.products;
    this.inventory.inventoryReports().subscribe((result) => {
      this.products = result;
      console.log(this.products);
    });

    this.suppliers = this.supplier.suppliers;
    this.supplier.supplierReports().subscribe((result2) => {
      this.suppliers = result2;
      console.log(this.supplier);
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
