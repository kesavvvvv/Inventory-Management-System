import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { purchaseReports } from 'src/purchaseReports';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseService } from '../purchase.service';

import { MatDialog } from '@angular/material/dialog';
import { PurchaseDialogComponent } from './purchase-dialog/purchase-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { UpdatePurchaseDialogComponent } from './update-purchase-dialog/update-purchase-dialog.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseComponent implements OnInit {
  displayedColumns: string[] = [
    'purchase_id',
    'product_id',
    'quantity',
    'supplier_id',
    'dateofpurchase',
    'status',
    'paid',
    'paymentMethod',
    'update',
  ];
  dataSourceDraft: any = new MatTableDataSource<purchaseReports>();
  dataSourceRaised: any = new MatTableDataSource<purchaseReports>();
  dataSourceReceived: any = new MatTableDataSource<purchaseReports>();
  dataSourceClosed: any = new MatTableDataSource<purchaseReports>();
  dataSource: any = new MatTableDataSource<purchaseReports>();
  constructor(private service: PurchaseService, public dialog: MatDialog) {}
  isLoading = true;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSourceDraft.paginator = this.paginator;
    this.dataSourceRaised.paginator = this.paginator;
    this.dataSourceReceived.paginator = this.paginator;
    this.dataSourceClosed.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.service.purchaseReports().subscribe(
      (result) => {
        if (!result) {
          return;
        }
        console.log(result);

        // let list = [result];
        // console.log(list);
        this.isLoading = false;
        // this.dataSource.data = result;

        // this.dataSource.sort= this.sort;
        //  this.dataSource.paginator=this.paginator;
        let k = 0;
        const data1 = this.dataSourceDraft.data;
        const data2 = this.dataSourceRaised.data;
        const data3 = this.dataSourceReceived.data;
        const data4 = this.dataSourceClosed.data;
        for (let i in result) {
          if (Object.values(result)[k].status === 'draft') {
            console.log(Object.values(result)[k]);
            data1.push(Object.values(result)[k]);
            this.dataSourceDraft.data = data1;
          } else if (Object.values(result)[k].status === 'raised') {
            data2.push(Object.values(result)[k]);
            this.dataSourceRaised.data = data2;
          } else if (Object.values(result)[k].status === 'received') {
            data3.push(Object.values(result)[k]);
            this.dataSourceReceived.data = data3;
          } else if (Object.values(result)[k].status === 'closed') {
            data4.push(Object.values(result)[k]);
            this.dataSourceClosed.data = data4;
          }
          k++;
        }
      },
      (error) => (this.isLoading = false)
    );
  }
  editDialog(id: any, pid: any, quant: any, sid: any, dop: any,stat:any,p:any,pm:any): void {
    let dialogRef = this.dialog.open(UpdatePurchaseDialogComponent, {
      width: '450px',
      height: '350px',
      data: {
        purchaseId: id,
        productId: pid,
        purchaseQuantity: quant,
        supplierId: sid,
        dateOfPurchase: dop,
        status:stat,
        paid:p,
        paymentMethod:pm
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.fetch();
      console.log(result);
    });
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(PurchaseDialogComponent, {
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
    this.dataSourceDraft.data = [];
    this.dataSourceRaised.data = [];
    this.dataSourceReceived.data = [];
    this.dataSourceClosed.data = [];

    this.service.purchaseReports().subscribe((result) => {
      if (!result) {
        return;
      }

      let k = 0;
      const data1 = this.dataSourceDraft.data;
      const data2 = this.dataSourceRaised.data;
      const data3 = this.dataSourceReceived.data;
      const data4 = this.dataSourceClosed.data;

      for (let i in result) {
        if (Object.values(result)[k].status === 'draft') {
          data1.push(Object.values(result)[k]);
          this.dataSourceDraft.data = data1;
        } else if (Object.values(result)[k].status === 'raised') {
          data2.push(Object.values(result)[k]);
          this.dataSourceRaised.data = data2;
        } else if (Object.values(result)[k].status === 'received') {
          data3.push(Object.values(result)[k]);
          this.dataSourceReceived.data = data3;
        } else if (Object.values(result)[k].status === 'closed') {
          data4.push(Object.values(result)[k]);
          this.dataSourceClosed.data = data4;
        }
        k++;
      }

      // this.dataSource.data = result;
      // this.dataSource.sort= this.sort;
      //  this.dataSource.paginator=this.paginator;
    });
  }
}
