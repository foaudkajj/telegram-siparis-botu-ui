import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest } from '../Models/LoginRequest';
import { LoginResponse } from '../Models/LoginResponse';
import { map, tap } from 'rxjs/operators';
import { UIResponse } from '../Models/UIResponse';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {

    constructor(httpClient: HttpClient, router: Router,
        private _fuseNavigationService: FuseNavigationService, private _translateService: TranslateService) {
        super(httpClient, router);

    }

    Login(loginRequest: LoginRequest): Observable<any> {
        let result$ = this.post(`User/Login`, loginRequest)
            .pipe(
                tap((data: UIResponse<LoginResponse>) => {
                    if (data.Result.IsAuthenticated) {
                        this._fuseNavigationService.register('main', data.Result.NavigationItems);
                        this._fuseNavigationService.setCurrentNavigation('main')
                        sessionStorage.setItem("Authorization", data.Result.Token);
                        localStorage.setItem("user", JSON.stringify(data.Result))
                        setTimeout(() => {
                            this._translateService.setDefaultLang('en');
                            this._translateService.setDefaultLang('tr');
                        }, 200);
                    }

                })
            )
        return result$;
    }
}
