import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

	icon:string;
	type:string;
	constructor(
		@Inject(MAT_SNACK_BAR_DATA) public data: any
	) {
		this.type = 'info'
    this.icon='mdi-information';
	}

	ngOnInit() {
		this.type = ( this.data.type ) ? this.data.type : 'info'

		switch ( this.data.type ) {
			case 'info' :
				this.icon = 'mdi-information'
				break;
			case 'warning' :
				this.icon = 'mdi-alert-circle'
				break;
			case 'success' :
				this.icon = 'mdi-check-circle'
				break;
			case 'error' :
				this.icon = 'mdi-alert-circle'
				break;
		}
	}

}
