import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemServicesService } from 'src/app/Services/cart-item-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartItemCount: number = 0;

  constructor(private CartItemService: CartItemServicesService , private router :Router) {}

  ngOnInit() {
    // Subscribe to cart changes to update the item count
    this.CartItemService.CartItems.subscribe(items => {
      this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  goToCart() {
    // Logic to navigate to the cart page
    this.router.navigate(['/CartItems']);
  }
}
