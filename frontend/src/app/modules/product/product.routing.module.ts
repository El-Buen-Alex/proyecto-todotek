import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductIndexPageComponent } from './pages/product-index-page/product-index-page.component';

const routes: Routes = [
	{
		path : '',
		component : ProductIndexPageComponent,
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductRoutingModule { }
