import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { CartListComponent } from './Components/cart-list/cart-list.component';

const routes: Routes = [
  { path: '', component: ProductsComponent},
  { path: '', component: CartListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
