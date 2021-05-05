import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { OrderService } from '../order.service';
import { InventoryService } from '../inventory.service';
import { PurchaseService } from '../purchase.service';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})

export class GraphsComponent {

  constructor(private service: OrderService, private purchase: PurchaseService, private inventory: InventoryService) {}

  run: any = false;
  run2: any = false;
  run3: any = false;
  run4: any = false;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      labels: {
        fontColor: 'black',
        fontSize: 18
      }
    },
    
  };
  public pieChartLabels: Label[] = ['Not Confirmed', 'Confirmed', 'Shipped', 'Delivered'];
  public pieChartData: number[] = [0,0,0,0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

    
 
  public pieChartLabels2: Label[] = ['Draft', 'Raised', 'Received', 'Closed'];
  public pieChartData2: number[] = [0,0,0,0];
  

  public pieChartLabels3: Label[] = [];
  public pieChartData3: number[] = [];
  
  public pieChartLabels4: Label[] = ["Units Sold", "Total Orders"];
  public pieChartData4: number[] = [1, 1]; 

  revenue: number = 0;
  orders: number = 0;
  units: number = 0;
  ngOnInit(): void {

    this.service.orderReports().subscribe(
      (result) => {
        if (!result) {
          return;
        }

        console.log(result);
        let k = 0;
        
        for (let i in result) {
          if (Object.values(result)[k].status === 'shipped') {
            
            this.pieChartData[2] += 1;
          } else if (Object.values(result)[k].status === 'confirmed') {
            this.pieChartData[1] += 1;
          } else if (Object.values(result)[k].status === 'delivered') {
            this.pieChartData[3] += 1;         
          } else if (Object.values(result)[k].status === 'not confirmed') {
            this.pieChartData[0] += 1;
          }
          k++;
          
        
        }
        this.run = true;
      }
      
    );

    this.purchase.purchaseReports().subscribe(
      (result) => {
        if (!result) {
          return;
        }

     //   console.log(result);
        let k = 0;
        for (let i in result) {
          if (Object.values(result)[k].status === 'received') {
            
            this.pieChartData2[2] += 1;
          } else if (Object.values(result)[k].status === 'raised') {
            this.pieChartData2[1] += 1;
          } else if (Object.values(result)[k].status === 'closed') {
            this.pieChartData2[3] += 1;         
          } else if (Object.values(result)[k].status === 'draft') {
            this.pieChartData2[0] += 1;
          }
          k++;
          
        
        }
        this.run2 = true;

        
      }
      
    );

    console.log(this.pieChartData)

    this.inventory.inventoryReports().subscribe(
      (result) => {
        if (!result) {
          return;
        }

    //    console.log(result);
        let k = 0;
        for (let i in result) {
         
          this.pieChartLabels3.push(Object.values(result)[k].itemName);
          this.pieChartData3.push(Object.values(result)[k].available);
          k++
        }
        this.run3 = true;

        
      }
      
    );

    console.log(this.pieChartData)

    this.service.getGraph().subscribe(
      (result) => {
        if (!result) {
          return;
        }
        let t = [];
        console.log(result);
        let k = 0;
        console.log(Object.values(result))
        this.revenue = Object.values(result)[0]
        this.units = Object.values(result)[1]
        this.orders = Object.values(result)[2]
        this.run4 = true;
      }
      
    );

  }

  // ngOnInit(): void {
  //   var myChart = new Chart('mychart', {
  //     type: 'line',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [
  //         {
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3],
  //           backgroundColor: [
  //             'rgba(255, 99, 132, 0.2)',
  //             'rgba(54, 162, 235, 0.2)',
  //             'rgba(255, 206, 86, 0.2)',
  //             'rgba(75, 192, 192, 0.2)',
  //             'rgba(153, 102, 255, 0.2)',
  //             'rgba(255, 159, 64, 0.2)',
  //           ],
  //           borderColor: [
  //             'rgba(255, 99, 132, 1)',
  //             'rgba(54, 162, 235, 1)',
  //             'rgba(255, 206, 86, 1)',
  //             'rgba(75, 192, 192, 1)',
  //             'rgba(153, 102, 255, 1)',
  //             'rgba(255, 159, 64, 1)',
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         yAxes: [
  //           {
  //             ticks: {
  //               beginAtZero: true,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  // }
}
