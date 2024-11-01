import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {
  private URL = 'http://localhost:5181/api/Product'

  constructor( private http: HttpClient) {
   }

   getProducts (page:number,pageSize:number,CategoryID?:number): Observable<Product[]> {
    let url = this.URL+'?Page='+page+'&PageSize='+pageSize;
    if(CategoryID)
      url += '&categoryID='+CategoryID;
    return this.http.get<Product[]>(url)
   }
}
