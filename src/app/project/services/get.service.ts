import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GetService extends BaseService {
    constructor(httpClient: HttpClient, router: Router) {
        super(httpClient, router);
    }

    GetCategories(): Observable<any> {
        let result$ = this.get(`Category/Get`);
        return result$;
    }

    GetRoles(): Observable<any> {
        let result$ = this.get(`Roles/Get`);
        return result$;
    }

}