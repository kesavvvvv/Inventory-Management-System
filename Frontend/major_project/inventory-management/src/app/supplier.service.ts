import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { supplierReports } from 'src/supplierReports';
@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}
  public updateReports(data: supplierReports) {
    console.log(data);
    this.http
      .post<any>('/api/supplier/add/', data)
      .subscribe((data) => console.log(data));
  }
  public supplierReports() {
    return this.http.get('/api/supplier/get');
  }
  suppliers: any = [];
}
