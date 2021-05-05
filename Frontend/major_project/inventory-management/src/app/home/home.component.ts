import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as Chart from 'chart.js';
import { inventoryReports } from 'src/inventoryReports';
import { InventoryService } from '../inventory.service';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeDialogComponent } from './home-dialog/home-dialog.component';
import { of } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import {
  ChangeDetectionStrategy,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'itemId',
    'itemName',
    'outgoing',
    'onhand',
    'incoming',
    'available',
    'purchase_price',
    'selling_price',
  ];
  dataSource: any = new MatTableDataSource<inventoryReports>();
  isLoading = false;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  constructor(private service: InventoryService, public dialog: MatDialog) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(HomeDialogComponent, {
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
    this.service.inventoryReports().subscribe((result) => {
      if (!result) {
        return;
      }

      // let json = JSON.stringify(result);
      // console.log(json);
      // let list = [result];
      // console.log(list);

      this.dataSource.data = result;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.service
    //   .inventoryReports()
    //   .pipe(take(1))
    //   .subscribe((result) => {
    //     console.log(result);
    //     this.dataSource.data = result;
    //   });
    this.service.inventoryReports().subscribe(
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
        //  this.dataSource.paginator=this.paginator;
      },
      (error) => (this.isLoading = false)
    );
  }
}
