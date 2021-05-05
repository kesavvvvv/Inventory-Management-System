import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { orderReports } from 'src/orderReports';

import { InventoryService } from 'src/app/inventory.service';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  constructor(private http: HttpClient, private inventory: InventoryService,) {}

  public orderReports() {
    // return of([{itemId:1,itemName:'banana',itemQuantity:'5kg'}]);
    return this.http.get('/api/order/get');
  }
  products: any;
  public addReports(data: orderReports) {
    console.log(data);
    this.inventory.inventoryReports().subscribe((result) => {
      this.products = result;
      console.log("hello");
      
      let k = 0;

      for(var i in result) {
        if(Object.values(result)[k].itemId == data.productId) {
          if(Object.values(result)[k].available >= data.orderQuantity) {
            console.log(Object.values(result)[k].available)
            this.http
            .post<any>('/api/order/add/', data)
            .subscribe((data) => console.log(data));
          }
          else {
            alert("Sorry quantity not available in Inventory. Available: " + Object.values(result)[k].available);
          }
        }
        k++;
      }
      
    });

    

    // ,itemName: String, itemQuantity: String
    // console.log(itemName);
    // console.log(itemQuantity);
    //   .subscribe(data => {
    //     this.postId = data.id;
    // })
  }

  public updateReports(data: orderReports) {
    console.log(data);
    let id = data.orderId;
    let stat = data.status;

    console.log(id,stat)
    
    this.inventory.inventoryReports().subscribe((result) => {
      this.products = result;
      console.log("hello");
      
      let k = 0;
      for(var i in result) {
        if(data.status === "confirmed") {
          if(Object.values(result)[k].itemId == data.productId) {
            if(Object.values(result)[k].available >= data.orderQuantity) {
              if(!(data.status === "delivered" && data.paid === "No")) {
                this.http
                .put<any>('/api/order/update/' + id , data)
                .subscribe((data1) => console.log(data1));
              //add code for service here
              }
              else {
                alert("Payment Not Completed")
              }
            }
            else {
              alert("Sorry quantity not available in Inventory. Available: " + Object.values(result)[k].available);
            }
          }
        }
        else {
          if(!(data.status === "delivered" && data.paid === "No")) {
            this.http
            .put<any>('/api/order/update/' + id , data)
            .subscribe((data1) => console.log(data1));
          //add code for service here
          }
          else {
            alert("Payment Not Completed")
          }
        }
        k++;
      }
      
      });

    
  
  }

  public getGraph() {
    return this.http.get('/api/order/graph');
  }
}
