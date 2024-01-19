import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndexPageComponent } from './pages/product-index-page/product-index-page.component';
import { ProductRoutingModule } from './product.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCreateModalComponent } from './modals/product-create-modal/product-create-modal.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductEditModalComponent } from './modals/product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from './modals/product-delete-modal/product-delete-modal.component';



@NgModule({
  declarations: [
    ProductIndexPageComponent,
    ProductCreateModalComponent,
    ProductFormComponent,
    ProductEditModalComponent,
    ProductDeleteModalComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
  ]
})
export class ProductModule { }
