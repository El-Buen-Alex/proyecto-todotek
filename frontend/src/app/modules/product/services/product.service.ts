import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment as ENV } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Injectable({
	providedIn: 'root'
})

export class ProductService {
	route:string
	constructor(
		private _httpClient : HttpClient,
		private notify : NotifyService,
	) {
		this.route=`${ENV.apiUrl}/product`;
	}
	getProducts(  ) : Observable<any> {
		return this._httpClient.get(this.route).pipe(
            catchError(
                err=>{
                    this.notify.showSnackAlert('Ha ocurrido un error', 'error')
                    return err;
                }
            )
        );
	}
	

}
