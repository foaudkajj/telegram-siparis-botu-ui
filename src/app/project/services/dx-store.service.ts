import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import {createStore} from 'devextreme-aspnet-data-nojquery';
import {environment} from 'environments/environment';
import {DxStoreOptions} from '../models/dx-store-options';
import {SwalService} from './swal.service';
import {UIResponse} from '../models/ui-response';

@Injectable({
  providedIn: 'root',
})
export class DxStoreService {
  constructor(private swal: SwalService, private router: Router) {}

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
        if (storeOptions.onInserted) storeOptions.onInserted(values, key);
        else if (!values.IsError) this.swal.showSuccessMessage();
      },
      onLoaded: (result: Array<any>) => {
        if (storeOptions.onLoaded) storeOptions?.onLoaded(result);
      },
      onRemoved: key => {
        if (storeOptions.onRemoved) {
          storeOptions.onRemoved(key);
        } else this.swal.showSuccessMessage();
      },
      onUpdated: (key, values) => {
        if (storeOptions.onUpdated) storeOptions.onUpdated(key, values);
        else this.swal.showSuccessMessage();
      },
      onBeforeSend: (method, ajaxOptions) => {
        if (sessionStorage.getItem('Authorization')) {
          ajaxOptions.headers = {
            Authorization: 'Bearer ' + sessionStorage.getItem('Authorization'),
          };
        } else {
          this.router.navigate(['login']);
        }
        return storeOptions.OnBeforeSend;
      },
      errorHandler: (e: Error) => this.swal.showErrorMessage(e.message),
    });
  }
}
