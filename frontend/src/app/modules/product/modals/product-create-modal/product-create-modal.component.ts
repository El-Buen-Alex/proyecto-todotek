import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CategoryResponse, ProductResponse } from 'src/app/shared/interface/product.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ProductService } from '../../services/product.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-create-modal',
  templateUrl: './product-create-modal.component.html',
  styleUrls: ['./product-create-modal.component.scss']
})
export class ProductCreateModalComponent implements OnInit {

  @Output() onCreated=new EventEmitter<ProductResponse>();
  mainForm:UntypedFormGroup;

  modal:{
    loading:boolean,
    error:boolean,
  }

  categories:CategoryResponse[]=[]

  constructor(
    private _formBuilder:UntypedFormBuilder,
    private _categoryService:CategoryService,
    private _notifyService:NotifyService,
    private _productService:ProductService,
    public dialogRef: MatDialogRef<ProductCreateModalComponent>,
  ) {
    this.mainForm=this._formBuilder.group({

    });
    this.modal={
      loading:true,
      error:false,
    }
   }

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData(){
    this.modal.loading=true;
    this.modal.error=false;
    this._categoryService.getCategories()
      .subscribe(
        result=>{
          if(result.status){
            this.categories=result.data.categories
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

  create(){
    this._notifyService.showModalLoading();
    const {product}=this.mainForm.value;

    this._productService.store(product.name, product.category_id)
      .subscribe(
        result=>{
          this._notifyService.showSingleMessage(result.message)
          if(result.status){
            this.onCreated.emit(result.data.product)
            this.dialogRef.close();
          }
          this._notifyService.closeModalLoading();
        },
        onError=>{
          this._notifyService.closeModalLoading();
        }
      )
  }

}
