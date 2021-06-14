import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';


@Injectable()
export class BaseService {
	constructor(public httpClient: HttpClient, private router: Router) { }

	get<T>(url: string, options?: Object) {
		return this.httpClient.get<T>(environment.apiUrl + url, options);
	}
	post<T>(url: string, payload: any, options?: Object) {
		// const formData = new FormData();
		// formData.append('values', JSON.stringify(payload));
		return this.httpClient.post<T>(environment.apiUrl + url, payload, options);
	}
	put(url: string, payload: any, options?: Object) {
		return this.httpClient.put(environment.apiUrl + url, payload, options);
	}
	delete(url: string, options?: Object) {
		return this.httpClient.delete(environment.apiUrl + url, options);
	}
}
