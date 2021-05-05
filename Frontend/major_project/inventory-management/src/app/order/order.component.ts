import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../order.service';

import { orderReports } from 'src/orderReports';
import { MatPaginator } from '@angular/material/paginator';
import { UpdtaeOrderDialogComponent } from './updtae-order-dialog/updtae-order-dialog.component';
// export interface PeriodicElement {
//   order_id: number;
//   product_id: number;
//   quantity: number;
//   date_of_purchase: Date;
//   customer_id: number;
//   status: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     order_id: 1,
//     product_id: 1,
//     quantity: 0,
//     date_of_purchase: new Date(2018, 11, 24),
//     customer_id: 0,
//     status: '-',
//   },
// ];

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = [
    'order_id',
    'product_id',
    'customer_id',
    'dateOfPurchase',
    'quantity',
    'status',
    'paid',
    'paymentMethod',
    'update',
  ];

  // dataSource: any = new MatTableDataSource<orderReports>();
  dataSourceConfirmed: any = new MatTableDataSource<orderReports>();
  dataSourceDelivered: any = new MatTableDataSource<orderReports>();
  dataSourceShipped: any = new MatTableDataSource<orderReports>();
  dataSourceNotConfirmed: any = new MatTableDataSource<orderReports>();
  isLoading = true;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private service: OrderService, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSourceDelivered.paginator = this.paginator;
    this.dataSourceShipped.paginator = this.paginator;
    this.dataSourceConfirmed.paginator = this.paginator;
    this.dataSourceNotConfirmed.paginator = this.paginator;
  }

  ngOnInit(): void {
    // this.service
    //   .inventoryReports()
    //   .pipe(take(1))
    //   .subscribe((result) => {
    //     console.log(result);
    //     this.dataSource.data = result;
    //   });

    this.service.orderReports().subscribe(
      (result) => {
        if (!result) {
          return;
        }

        console.log(result);

        this.isLoading = false;
        // console.log(
        //   Object.keys(result)[0],
        //   <orderReports>Object.values(result)[1]
        // );

        let k = 0;
        const data1 = this.dataSourceShipped.data;
        const data2 = this.dataSourceConfirmed.data;
        const data3 = this.dataSourceDelivered.data;
        const data4 = this.dataSourceNotConfirmed.data;
        for (let i in result) {
          if (Object.values(result)[k].status === 'shipped') {
            console.log(Object.values(result)[k]);
            data1.push(Object.values(result)[k]);
            this.dataSourceShipped.data = data1;
          } else if (Object.values(result)[k].status === 'confirmed') {
            data2.push(Object.values(result)[k]);
            this.dataSourceConfirmed.data = data2;
          } else if (Object.values(result)[k].status === 'delivered') {
            data3.push(Object.values(result)[k]);
            this.dataSourceDelivered.data = data3;
          } else if (Object.values(result)[k].status === 'not confirmed') {
            data4.push(Object.values(result)[k]);
            this.dataSourceNotConfirmed.data = data4;
          }
          k++;
        }
        // this.dataSource.data = result;

        // this.dataSource.sort= this.sort;
        //  this.dataSource.paginator=this.paginator;
      },
      (error) => (this.isLoading = false)
    );
  }

  editDialog(
    id: any,
    pid: any,
    cid: any,
    quant: any,
    stat: any,
    p: any,
    pm: any
  ): void {
    let dialogRef = this.dialog.open(UpdtaeOrderDialogComponent, {
      width: '450px',
      height: '350px',
      data: {
        orderId: id,
        purchaseId: pid,
        customerId: cid,
        orderQuantity: quant,
        status: stat,
        paid: p,
        paymentMethod: pm,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.fetch();
      console.log(result);
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '450px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.fetch();
      console.log(result);
      //    this.ELEMENT_DATA.push(result);
      //   this.itemId = result;
    });
  }

  fetch() {
    this.dataSourceShipped.data = [];
    this.dataSourceConfirmed.data = [];
    this.dataSourceDelivered.data = [];
    this.dataSourceNotConfirmed.data = [];

    this.service.orderReports().subscribe((result) => {
      if (!result) {
        return;
      }
      // console.log(result);
      let k = 0;
      const data1 = this.dataSourceShipped.data;
      const data2 = this.dataSourceConfirmed.data;
      const data3 = this.dataSourceDelivered.data;
      const data4 = this.dataSourceNotConfirmed.data;

      for (let i in result) {
        if (Object.values(result)[k].status === 'shipped') {
          data1.push(Object.values(result)[k]);
          this.dataSourceShipped.data = data1;
        } else if (Object.values(result)[k].status === 'confirmed') {
          data2.push(Object.values(result)[k]);
          this.dataSourceConfirmed.data = data2;
        } else if (Object.values(result)[k].status === 'delivered') {
          data3.push(Object.values(result)[k]);
          this.dataSourceDelivered.data = data3;
        } else if (Object.values(result)[k].status === 'not confirmed') {
          data4.push(Object.values(result)[k]);
          this.dataSourceNotConfirmed.data = data4;
        }
        k++;
      }

      // this.dataSource.data = result;
      // this.dataSource.sort= this.sort;
      //  this.dataSource.paginator=this.paginator;
    });
  }
}
