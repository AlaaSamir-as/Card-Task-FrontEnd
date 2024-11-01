import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServicesService {
  private URL = 'http://localhost:5181/api/Category'
  constructor(private http : HttpClient) { }

  GetCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.URL);
  }
}
