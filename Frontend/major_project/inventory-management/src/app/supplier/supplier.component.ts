import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { supplierReports } from 'src/supplierReports';
import { SupplierService } from '../supplier.service';
import { SupplierDialogComponent } from './supplier-dialog/supplier-dialog.component';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierComponent implements OnInit {
  displayedColumns: string[] = [
    'supplier_id',
    'name',
    'address',
    'mobile_no',
    'email',
  ];
  dataSource: any = new MatTableDataSource<supplierReports>();
  isLoading = false;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  constructor(private service: SupplierService, public dialog: MatDialog) {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(SupplierDialogComponent, {
      width: '450px',
      height: '270px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.isLoading = false;
      this.fetch();
      console.log(result);
    });
  }

  fetch() {
    this.dataSource.data = [];
    this.service.supplierReports().subscribe((result) => {
      if (!result) {
        return;
      }

      // let json = JSON.stringify(result);
      // console.log(json);
      // let list = [result];
      // console.log(list);

      this.dataSource.data = result;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.supplierReports().subscribe(
      (result) => {
        if (!result) {
          return;
        }
        console.log(result);

        this.isLoading = false;
        this.dataSource.data = result;

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => (this.isLoading = false)
    );
  }
}
