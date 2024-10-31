import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../Interfaces/product';
import { CartItem } from '../Interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartItemServicesService {
  private Items = new BehaviorSubject<CartItem[]>([]);
  CartItems = this.Items.asObservable();
  constructor() { }

  AddCartItem(Product: Product){
    const ExistingCartItem = this.Items.value.find(item => item.ProductId === Product.ID);
    if(ExistingCartItem){
      ExistingCartItem.Quantity ++;
    }else{
      this.Items.value.push({ProductId: Product.ID, Quantity: 1});
    }
    this.Items.next([...this.Items.value]);
  }

  UpdateCartItem(ProductId :number, Quantity :number){
    this.Items.value.map(item => item.ProductId === ProductId ? item.Quantity =Quantity : item);
    this.Items.next([...this.Items.value]);
  }

  RemoveCartItem(ProductId :number){
    this.Items.value.filter(item => item.ProductId !== ProductId);
    this.Items.next([...this.Items.value]);
  }
}
