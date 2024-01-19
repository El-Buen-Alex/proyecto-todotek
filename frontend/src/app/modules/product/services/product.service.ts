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
	getProducts( pageIndex:number=1, count=10 ) : Observable<any> {
		return this._httpClient.get(this.route, {
			params:{
				'page':pageIndex,
				'take':count
			}
		}).pipe(
            catchError(
                err=>{
                    this.notify.showSnackAlert('Ha ocurrido un error', 'error')
                    return err;
                }
            )
        );
	}

	store(name:string, categoryId:number) : Observable<any>{
		return this._httpClient.post(this.route, {
			'name':name,
			'category_id':categoryId
		}).pipe(
            catchError(
                err=>{
                    this.notify.showSnackAlert('Ha ocurrido un error', 'error')
                    return err;
                }
            )
        );
	}
	

}
