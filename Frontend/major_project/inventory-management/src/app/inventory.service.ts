import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  public inventoryReports() {
    // return of([{itemId:1,itemName:'banana',itemQuantity:'5kg'}]);
    return this.http.get('/api/inventory/get');
  }

  products: any = [];
}
