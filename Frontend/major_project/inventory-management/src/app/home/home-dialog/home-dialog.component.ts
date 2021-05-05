import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdatedInventoryService } from '../../updated-inventory.service';
@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrls: ['./home-dialog.component.css'],
})
export class HomeDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HomeDialogComponent>,
    private service: UpdatedInventoryService
  ) {}

  dialogformgroup = new FormGroup({
    itemId: new FormControl(''),
    itemName: new FormControl('', Validators.required),
    available: new FormControl('', Validators.required),
    purchase_price: new FormControl('', Validators.required),
    selling_price: new FormControl('', Validators.required),
    
    
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
