import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { customerReports } from 'src/customerReports';
import { CustomerService } from '../customer.service';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = [
    'customerId',
    'name',
    'address',
    'mobile',
    'emailId',
  ];
  dataSource: any = new MatTableDataSource<customerReports>();
  isLoading = false;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  constructor(private service: CustomerService, public dialog: MatDialog) {}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '450px',
      height: '270px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.isLoading = false;
      this.fetch();
      console.log(result);
      //    this.ELEMENT_DATA.push(result);
      //   this.itemId = result;
    });
  }
  fetch() {
    this.dataSource.data = [];
    this.service.customerReports().subscribe((result) => {
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
    this.service.customerReports().subscribe(
      (result) => {
        if (!result) {
          return;
        }
        console.log(result);
        // let json = JSON.stringify(result);
        // console.log(json);
        // let list = [result];
        // console.log(list);
        this.isLoading = false;
        this.dataSource.data = result;

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => (this.isLoading = false)
    );
  }
}
