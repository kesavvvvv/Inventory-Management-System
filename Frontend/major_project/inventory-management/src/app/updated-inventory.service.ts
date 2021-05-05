import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { inventoryReports } from 'src/inventoryReports';
@Injectable({
  providedIn: 'root',
})
export class UpdatedInventoryService {
  constructor(private http: HttpClient) {}

  public updateReports(data: inventoryReports) {
    console.log(data);
    this.http
      .post<any>('/api/inventory/add/', data)
      .subscribe((data) => console.log(data));

    // ,itemName: String, itemQuantity: String
    // console.log(itemName);
    // console.log(itemQuantity);
    //   .subscribe(data => {
    //     this.postId = data.id;
    // })
  }
}
