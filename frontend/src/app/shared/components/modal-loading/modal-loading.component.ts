import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
	selector: 'app-modal-loading',
	templateUrl: './modal-loading.component.html',
	styleUrls: ['./modal-loading.component.scss']
})
export class ModalLoadingComponent implements OnInit {
  message:string;
  constructor(
    @Inject( MAT_DIALOG_DATA ) public data:any,
  ) {
    this.message="Procesando...";
   }

  ngOnInit() {
    if(this.data && this.data.message){
      this.message=this.data.message;
    }
  }

}
