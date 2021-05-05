import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/customer.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    private service: CustomerService
  ) {}

  dialogformgroup = new FormGroup({
    customerId: new FormControl(''),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
    
    
    // itemName: any;
    // itemQuantity: any;
  });

  ngOnInit(): void {}


  onNoClick(): void {
    // console.log(this.itemName);

    // if (!this.itemName && !this.itemQuantity) {
    //   console.log('empty');
    //   this.dialogRef.close();
    //   return;
    // }
    console.log(this.dialogformgroup.valid);
    if (this.dialogformgroup.valid) {
      this.service.updateReports(this.dialogformgroup.getRawValue());
      // this.service.updateReports(this.itemName, this.itemQuantity);
      //api call here to update the table and  give the values of itmeid,itemname and item quantity in it etc.
      this.dialogRef.close();
    }
  }
  close(): void {
    this.dialogRef.close();
  }

}
