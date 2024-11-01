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

  AddCartItem(ProductParam: Product){
    const ExistingCartItem = this.Items.value.find(item => item.Product.id === ProductParam.id);
    if(ExistingCartItem){
      ExistingCartItem.Quantity ++;
    }else{
      this.Items.value.push({Product: ProductParam, Quantity: 1 });
    }
    this.Items.next([...this.Items.value]);
  }

  UpdateCartItem(ProductId :number, Quantity :number){
    this.Items.value.map(item => item.Product.id === ProductId ? item.Quantity =Quantity : item);
    this.Items.next([...this.Items.value]);
  }

  RemoveCartItem(ProductId :number){
    let NewCartItems= this.Items.value.filter(item => item.Product.id !== ProductId);
    this.Items.next(NewCartItems);
  }
}
