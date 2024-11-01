import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Interfaces/category';
import { Product } from 'src/app/Interfaces/product';
import { CartItemServicesService } from 'src/app/Services/cart-item-services.service';
import { CategoryServicesService } from 'src/app/Services/category-services.service';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  Products : Product[] = [];
  Categories : Category[] = [];
  Page : number = 1;
  PageSize : number = 3;
  TotalPages : number = 1;
  SelectedCategoryId : number = 0;

  constructor(private ProductService: ProductServicesService , private CartItemService : CartItemServicesService
    , private CategoryService : CategoryServicesService ){}
  ngOnInit(): void {
    this.LoadCategories();
    this.LoadProducts()
  }
  LoadCategories(): void {
    this.CategoryService.GetCategories().subscribe((categories) => {
      this.Categories = categories;
    });
  }
  LoadProducts() : void {
    this.ProductService.getProducts(this.Page,this.PageSize,this.SelectedCategoryId)
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

  FilterProductsByCategory(): void {
    this.LoadProducts();
  }
}
