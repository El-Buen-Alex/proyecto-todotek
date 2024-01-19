import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndexPageComponent } from './pages/product-index-page/product-index-page.component';
import { ProductRoutingModule } from './product.routing.module';



@NgModule({
  declarations: [
    ProductIndexPageComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
  ]
})
export class ProductModule { }
