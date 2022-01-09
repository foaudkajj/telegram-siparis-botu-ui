import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {catchError, finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SwalService} from '../services/swal.service';
import {LoadPanelService} from '../services/loadpnale.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private _pendingRequests = 0;
  constructor(
    private router: Router,
    private swalService: SwalService,
    private loadPnaelSerivce: LoadPanelService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    var headers = request.headers.set(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('Authorization'),
    );
    const authReq = request.clone({headers: headers});
    if (authReq.url.includes('/api/')) {
      if (this._pendingRequests === 0)
        this.loadPnaelSerivce.postLoadingChanged(true);
      this._pendingRequests++;
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.router.navigate(['login']);
        } else {
          if (error.error) {
            this.swalService.showErrorMessage(error.error.Message);
          } else {
            this.swalService.showErrorMessage(error.message);
          }
        }
        return throwError(error);
      }),
      finalize(() => {
        if (authReq.url.includes('/api/')) {
          this._pendingRequests--;
        }
        if (this._pendingRequests === 0) {
          this.loadPnaelSerivce.postLoadingChanged(false);
        }
      }),
    );
  }
}
