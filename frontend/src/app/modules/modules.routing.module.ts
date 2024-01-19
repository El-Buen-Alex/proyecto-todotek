import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	// {
	// 	path : '',
	// 	outlet : 'header',
	// 	component : HeaderComponent
	// },
	// {
	// 	path : '',
	// 	outlet : 'menu',
	// 	component : MenuComponent
	// },
	{
		path : '',
		loadChildren : () => import('../modules/product/product.module').then(m => m.ProductModule)
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ModulesRoutingModule { }
