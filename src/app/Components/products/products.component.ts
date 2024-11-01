import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/product';
import { CartItemServicesService } from 'src/app/Services/cart-item-services.service';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  Products : Product[] = [];
  Page : number = 1;
  PageSize : number = 3;
  TotalPages : number = 1;

  constructor(private ProductService: ProductServicesService , private CartItemService : CartItemServicesService){}
  ngOnInit(): void {
    this.LoadProducts()
  }
  LoadProducts() : void {
    this.ProductService.getProducts(this.Page,this.PageSize)
    .subscribe({
      next: (data) => {
        this.Products = data;
        this.TotalPages= Math.ceil(this.Products.length / this.PageSize)
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }
  AddItemToCart(Product:Product) : void {
    this.CartItemService.AddCartItem(Product);
  }
}
