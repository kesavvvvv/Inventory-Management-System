import { Injectable } from '@angular/core';
import { purchaseReports } from 'src/purchaseReports';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(private http: HttpClient) {}

  public purchaseReports() {
    // return of([{itemId:1,itemName:'banana',itemQuantity:'5kg'}]);
    return this.http.get('/api/purchase/get');
  }

  public addReports(data: purchaseReports) {
    console.log(data);
    this.http
      .post<any>('/api/purchase/add/', data)
      .subscribe((data) => console.log(data));

    // ,itemName: String, itemQuantity: String
    // console.log(itemName);
    // console.log(itemQuantity);
    //   .subscribe(data => {
    //     this.postId = data.id;
    // })
  }
  public updateReports(data: purchaseReports) {
    console.log(data);
    let id = data.purchaseId;
    let stat = data.status;
    console.log(id,stat)
    if(!(data.status === "closed" && data.paid === "No")) {
      this.http
        .put<any>('/api/purchase/update/' + id , data)
        .subscribe((data1) => console.log(data1));
      //add code for service here
    }
    else {
      alert("Payment Not Completed")
    }
  }
}
