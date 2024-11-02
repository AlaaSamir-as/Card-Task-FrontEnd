import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Product } from '../Interfaces/product';
import { CartItem } from '../Interfaces/cart-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartItemServicesService {
  private URL = 'http://localhost:5181/api/CartItem/'
  private Items = new BehaviorSubject<CartItem[]>([]);
  CartItems = this.Items.asObservable();
  headers :any;
  constructor(private http : HttpClient) {
    this.LoadCartItems();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   }

// Load items from the database
LoadCartItems(): void {
  this.http.get<CartItem[]>(this.URL).subscribe((items) => {
    this.Items.next(items);
  });
}

// Add item to the cart
AddCartItem(productId: number, quantity: number = 1) {
  return this.http.post(`${this.URL}+${productId}?quantity=${quantity}`,{} )
}

// Update item quantity in the cart
UpdateCartItem(productId: number, quantity: number): Observable<any> {
  return this.http.put(`${this.URL}+${productId}?quantity=${quantity}`,{} )
}

// Remove item from the cart
RemoveCartItem(productId: number) {
  return this.http.delete(this.URL + productId)
}

// Refresh the cart items after an update (call this after each add, update, or delete)
refreshCartItems(): void {
  this.LoadCartItems();
}


////////////////////////////////////////////////////////////////
/// IF want Static Data
////////////////////////////////////////////////////////////////
  // private Items = new BehaviorSubject<CartItem[]>([]);
  // CartItems = this.Items.asObservable();
  // constructor() { }

  // AddCartItem(ProductParam: Product){
  //   const ExistingCartItem = this.Items.value.find(item => item.Product.id === ProductParam.id);
  //   if(ExistingCartItem){
  //     ExistingCartItem.Quantity ++;
  //   }else{
  //     this.Items.value.push({Product: ProductParam, Quantity: 1 });
  //   }
  //   this.Items.next([...this.Items.value]);
  // }

  // UpdateCartItem(ProductId :number, Quantity :number){
  //   this.Items.value.map(item => item.Product.id === ProductId ? item.Quantity =Quantity : item);
  //   this.Items.next([...this.Items.value]);
  // }

  // RemoveCartItem(ProductId :number){
  //   let NewCartItems= this.Items.value.filter(item => item.Product.id !== ProductId);
  //   this.Items.next(NewCartItems);
  // }
}
