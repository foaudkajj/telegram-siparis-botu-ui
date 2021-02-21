import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { environment } from 'environments/environment';
import { DxStoreOptions } from '../Models/DxStoreOptions';
import { SwalService } from './swal.service';
import { UIResponse } from '../Models/UIResponse';


@Injectable({
    providedIn: 'root'
})
export class DxStoreService {
    constructor(private swal: SwalService, private router: Router) {
    }

    GetStore(storeOptions: DxStoreOptions): CustomStore {
        return createStore({
            key: storeOptions.Key,
            loadUrl: environment.apiUrl + storeOptions.loadUrl,
            insertUrl: environment.apiUrl + storeOptions.insertUrl,
            updateUrl: environment.apiUrl + storeOptions.updateUrl,
            deleteUrl: environment.apiUrl + storeOptions.deleteUrl,
            loadParams: storeOptions.loadParams,
            updateMethod: storeOptions.updateMethod,
            deleteMethod: storeOptions.deleteMethod,
            loadMode: storeOptions.loadMode,
            onInserted: (values: UIResponse<any>, key) => {
                storeOptions.onInserted(values, key);
                if (!values.IsError)
                    this.swal.showSuccessMessage();
            },
            onLoaded: (result: Array<any>) => {
                if (storeOptions.onLoaded)
                    storeOptions?.onLoaded(result);
            },
            onRemoved: (key) => {
                if (storeOptions.onRemoved) {
                    storeOptions.onRemoved(key);
                }

                this.swal.showSuccessMessage();
            },
            onUpdated: (key, values) => {
                if (storeOptions.onUpdated)
                    storeOptions.onUpdated(key, values);
                this.swal.showSuccessMessage();
            },
            onBeforeSend: (method, ajaxOptions) => {
                if (sessionStorage.getItem("Authorization")) {
                    ajaxOptions.headers = {
                        "Authorization": "Bearer " + sessionStorage.getItem("Authorization")
                    }
                }
                else {
                    this.router.navigate(["login"]);
                }
                return storeOptions.OnBeforeSend;
            },
            errorHandler: (e: Error) => this.swal.showErrorMessage(e.message)
        })
    }
}
