import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndexPageComponent } from './pages/product-index-page/product-index-page.component';
import { ProductRoutingModule } from './product.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProductIndexPageComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
  ]
})
export class ProductModule { }
