import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/Interfaces/cart-item';
import { CartItemServicesService } from 'src/app/Services/cart-item-services.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit{
  CartItems :CartItem[] =[];
  TotalPrice :number =0;
  TotalItems : number =0;

  constructor(private CartItemService: CartItemServicesService){}
  ngOnInit(): void {
    this.GetCartItemsWithTotalPrice();
  }

  GetCartItemsWithTotalPrice():void{
    this.CartItemService.CartItems.subscribe(
      CT => {this.CartItems = CT ;
              this.TotalItems = CT.reduce((acc, item) => acc + item.Quantity, 0);
              this.TotalPrice = CT.reduce((acc, item) => acc + item.Product.price * item.Quantity, 0);
          }
    );
  }

  UpdateCartItem(ProductID :number, Quantity:number) : void{
    this.CartItemService.UpdateCartItem(ProductID, Quantity );
  }

  RemoveCartItem(ProductID :number) : void{
    this.CartItemService.RemoveCartItem(ProductID);
  }
}
