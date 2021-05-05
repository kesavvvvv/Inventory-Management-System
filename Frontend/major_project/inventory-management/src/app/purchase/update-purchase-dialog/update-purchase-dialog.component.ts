import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PurchaseService } from 'src/app/purchase.service';
import { Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/inventory.service';
import { SupplierService } from 'src/app/supplier.service';
@Component({
  selector: 'app-update-purchase-dialog',
  templateUrl: './update-purchase-dialog.component.html',
  styleUrls: ['./update-purchase-dialog.component.css']
})
export class UpdatePurchaseDialogComponent implements OnInit {

  constructor(
    private service: PurchaseService,
    public dialogRef: MatDialogRef<UpdatePurchaseDialogComponent>,
    private inventory: InventoryService,
    private supplier: SupplierService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  dialogformgroup = new FormGroup({
    purchaseId: new FormControl(this.data.purchaseId, Validators.required),
    productId: new FormControl(this.data.productId, Validators.required),
    supplierId: new FormControl(this.data.supplierId, Validators.required),
    dateOfPurchase:new FormControl(this.data.dateOfPurchase, Validators.required),
    status: new FormControl(this.data.status, Validators.required),
    purchaseQuantity: new FormControl(
      this.data.purchaseQuantity,
      Validators.required
    ),
    paid:new FormControl(this.data.paid, Validators.required),
    paymentMethod:new FormControl(this.data.paymentMethod, Validators.required),
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
      console.log(this.suppliers);
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
