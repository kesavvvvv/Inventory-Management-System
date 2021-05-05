import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { customerReports } from 'src/customerReports';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  public updateReports(data: customerReports) {
    console.log(data);
    this.http
      .post<any>('/api/customer/add/', data)
      .subscribe((data) => console.log(data));

    // ,itemName: String, itemQuantity: String
    // console.log(itemName);
    // console.log(itemQuantity);
    //   .subscribe(data => {
    //     this.postId = data.id;
    // })
  }
  public customerReports() {
    // return of([{itemId:1,itemName:'banana',itemQuantity:'5kg'}]);
    return this.http.get('/api/customer/get');
  }
  customers: any = [];
}
