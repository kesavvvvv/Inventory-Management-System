import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupplierService } from 'src/app/supplier.service';

@Component({
  selector: 'app-supplier-dialog',
  templateUrl: './supplier-dialog.component.html',
  styleUrls: ['./supplier-dialog.component.css'],
})
export class SupplierDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SupplierDialogComponent>,
    private service: SupplierService
  ) {}
  dialogformgroup = new FormGroup({
    customerId: new FormControl(''),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onNoClick(): void {
    console.log(this.dialogformgroup.valid);
    if (this.dialogformgroup.valid) {
      this.service.updateReports(this.dialogformgroup.getRawValue());

      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
