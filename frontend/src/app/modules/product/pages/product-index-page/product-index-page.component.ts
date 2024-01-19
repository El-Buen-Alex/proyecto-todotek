import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ProductResponse } from 'src/app/shared/interface/product.interface';
import { ProductCreateModalComponent } from '../../modals/product-create-modal/product-create-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-index-page',
  templateUrl: './product-index-page.component.html',
  styleUrls: ['./product-index-page.component.scss']
})
export class ProductIndexPageComponent implements OnInit {


  page:{
    loading:boolean,
    error:boolean,
    title:string,
  }
  products:ProductResponse[]=[]
  constructor(
    private _productService:ProductService,
    private _notifyService:NotifyService,
    private _dialog:MatDialog,
  ) { 
    this.page={
      loading:true,
      error:false,
      title:'Mis Productos'
    }
  }

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData() {
    this.page.loading=true;
    this.page.error=false;
    this._productService.getProducts()
    .subscribe(
      result=>{
        if(result.status){
          this.products=result.data.products
        }else{  
          this.page.error=true;
          this._notifyService.showSingleMessage(result.message);
        }
        this.page.loading=false;
      },
      onError=>{
        this.page.error=true;
      }
    )
  }

  openCreate(){
    const dialogRef = this._dialog.open( ProductCreateModalComponent, {
			width : '80%',
      maxWidth:'450px',
			disableClose : true,
		});

		dialogRef.componentInstance.onCreated.subscribe(( result ) => {
			this.products.unshift(result)
		});
  }

}
