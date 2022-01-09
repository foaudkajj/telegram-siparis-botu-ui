import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  constructor(httpClient: HttpClient, router: Router) {
    super(httpClient, router);
  }

  CancelOrder(orderId: string): Observable<void> {
    return this.get(`Orders/Cancel/${orderId}`);
  }
}
