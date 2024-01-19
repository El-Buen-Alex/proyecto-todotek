import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { ModalLoadingComponent } from '../components/modal-loading/modal-loading.component';

@Injectable({
	providedIn: 'root'
})
export class NotifyService {
	dialogLoading:any;
	constructor(
		private snackBar: MatSnackBar,
		private dialogCtrl: MatDialog,
	) { }
	showSnackAlert(message:string, type:string="success", duration:number=2000, 
		position:MatSnackBarHorizontalPosition ='end' , 
		vertical : MatSnackBarVerticalPosition = 'bottom' ){
		this.snackBar.openFromComponent(SnackbarComponent, {
			data: {
				message: message,
				type: type
			},
			duration: duration,
			horizontalPosition: position ,
			verticalPosition: vertical 
		});
	}
	showMessage(data:any, time = 2000) {
		for (let key in data) {
			setTimeout(() => {

				this.snackBar.openFromComponent(SnackbarComponent, {
					data: {
						message: data[key].description,
						type: data[key].type
					},
					duration: time,
					horizontalPosition: 'end'
				});
			}, 125)
		}
	}
	showSingleMessage(data:any, time = 2000) {
		
		setTimeout(() => {

			this.snackBar.openFromComponent(SnackbarComponent, {
				data: {
					message: data.description,
					type: data.type
				},
				duration: time,
				horizontalPosition: 'end'
			});
		}, 125)
		
	}
	showModalLoading(data:{
		message?:string
	} = {}) {

		this.dialogLoading = this.dialogCtrl.open(ModalLoadingComponent, {
			disableClose: true,
			data: data
		});
	}
	closeModalLoading() {
		this.dialogLoading.close()
	}

}
