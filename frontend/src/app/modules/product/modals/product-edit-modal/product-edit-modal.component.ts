import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CategoryResponse, ProductResponse } from 'src/app/shared/interface/product.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent implements OnInit {

  @Output() onUpdated=new EventEmitter<ProductResponse>();
  mainForm:UntypedFormGroup;

  modal:{
    loading:boolean,
    error:boolean,
  }

  categories:CategoryResponse[]=[]
  productId:number=0;
  currentProduct!:ProductResponse;

  constructor(
    private _formBuilder:UntypedFormBuilder,
    private _categoryService:CategoryService,
    private _notifyService:NotifyService,
    private _productService:ProductService,
    public dialogRef: MatDialogRef<ProductEditModalComponent>,
    @Inject( MAT_DIALOG_DATA ) public data:any,
  ) {
    this.mainForm=this._formBuilder.group({

    });
    this.modal={
      loading:true,
      error:false,
    }
    this.productId=this.data.productId;
  }

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData(){
    this.modal.loading=true;
    this.modal.error=false;
    this._productService.edit(this.productId)
      .subscribe(
        result=>{
          if(result.status){
            this.categories=result.data.categories
            this.currentProduct=result.data.product
          }else{
            this._notifyService.showSingleMessage(result.message)
            this.modal.error=true;
          }
          this.modal.loading=false;
        },
        error=>{
          this.modal.error=false;
          this.modal.loading=false;
        }
      )
  }

  update(){
    this._notifyService.showModalLoading();
    const {product}=this.mainForm.value;

    this._productService.update(this.productId,product.name, product.category_id)
      .subscribe(
        result=>{
          this._notifyService.showSingleMessage(result.message)
          if(result.status){
            this.onUpdated.emit(result.data.product)
            this.dialogRef.close();
          }
          this._notifyService.closeModalLoading();
        }
      )
  }

}
