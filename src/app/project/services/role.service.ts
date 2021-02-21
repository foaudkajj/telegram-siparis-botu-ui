import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { RoleIdAndPermessions } from '../models/RoleIdAndPermessions';

@Injectable()
export class RoleService extends BaseService {
    constructor(httpClient: HttpClient, router: Router) {
        super(httpClient, router);
    }

    SaveRolePermessions(roleIdAndPermessions: RoleIdAndPermessions): Observable<any> {
        let result$ = this.post(`Roles/SaveRolePermessions`, roleIdAndPermessions);
        return result$;
    }

    GetRoles(): Observable<any> {
        let result$ = this.get(`Roles/Get`);
        return result$;
    }

}