import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ProductResponse } from 'src/app/shared/interface/product.interface';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.scss']
})
export class ProductDeleteModalComponent implements OnInit {
  @Output() onDeleted=new EventEmitter<ProductResponse>();

  currentProduct!:ProductResponse;
  constructor(
    private _notifyService:NotifyService,
    private _productService:ProductService,
    public dialogRef: MatDialogRef<ProductDeleteModalComponent>,
    @Inject( MAT_DIALOG_DATA ) public data:any,
  ) { 
    this.currentProduct=this.data.currentProduct
  }

  ngOnInit(): void {
  }

  delete(){
    this._notifyService.showModalLoading();
    this._productService.delete(this.currentProduct.id)
    .subscribe(
      result=>{
        this._notifyService.showSingleMessage(result.message)
        if(result.status){
          this.onDeleted.emit(this.currentProduct)
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
