import { Component, OnInit, Input } from '@angular/core';
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CategoryResponse, ProductResponse } from 'src/app/shared/interface/product.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() categories:CategoryResponse[]=[]
  @Input() currentProduct?:ProductResponse
  mainForm:UntypedFormGroup;
  fatherForm!:UntypedFormGroup;
  constructor(
    private _formBuilder:UntypedFormBuilder,
    private _ctrlForm:FormGroupDirective,
  ) { 
    this.mainForm=this._formBuilder.group({
      'name':['', [Validators.required]],
      'category_id':['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    if(this.currentProduct){
      this.mainForm.patchValue({
        'name':this.currentProduct.name,
        'category_id':this.currentProduct.category_id
      })
    }
    this.fatherForm=this._ctrlForm.form;
    this.fatherForm.addControl('product', this.mainForm)
  }

}
