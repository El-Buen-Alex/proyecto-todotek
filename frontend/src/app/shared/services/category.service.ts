import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from 'src/environments/environment';
import { NotifyService } from './notify.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class CategoryService {

    route:string
	constructor(
		private _httpClient : HttpClient,
		private notify : NotifyService,
	) {
		this.route=`${ENV.apiUrl}/category`;
	}
    getCategories(): Observable<any> {
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