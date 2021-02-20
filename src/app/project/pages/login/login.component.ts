import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'app/project/services/user.service';
import { SwalService } from 'app/project/services/swal.service';
import { LoginRequest } from 'app/project/Models/LoginRequest';
import { UIResponse } from 'app/project/Models/UIResponse';
import { LoginResponse } from 'app/project/Models/LoginResponse';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        public translate: TranslateService,
        private userSerivce: UserService,
        private swal: SwalService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    async LoginButton() {
        let loginRequest: LoginRequest = { username: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value }
        let loginResponse = await this.userSerivce.Login(loginRequest).toPromise() as UIResponse<LoginResponse>;
        if (loginResponse.Result.IsAuthenticated) {
            this.router.navigate(['usertypeselect'])
        } else {
            this.swal.showErrorMessage(loginResponse.MessageKey)
        }
    }
}
