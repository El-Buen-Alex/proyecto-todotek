import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ProductResponse } from 'src/app/shared/interface/product.interface';

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
          this._notifyService.showMessage(result.message);
        }
        this.page.loading=false;
      },
      onError=>{
        this.page.error=true;
      }
    )
  }

}
