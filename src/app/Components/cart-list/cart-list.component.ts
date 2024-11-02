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
              this.TotalItems = CT.reduce((acc, item) => acc + item.quantity, 0);
              this.TotalPrice = CT.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
          }
    );
  }

  UpdateCartItem(ProductID :number, Quantity:number) : void{
    this.CartItemService.UpdateCartItem(ProductID ,Quantity).subscribe({
      next: () => {
          this.CartItemService.refreshCartItems();
          alert("UpdateSucessfully");
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      }
    });
  }

  RemoveCartItem(ProductID :number) : void{
    this.CartItemService.RemoveCartItem(ProductID).subscribe({
      next: () => {
        this.CartItemService.refreshCartItems();
        alert("RemoveSucessfully");
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      }
    });
  }
}
