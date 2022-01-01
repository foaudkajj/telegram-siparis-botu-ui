import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { UIResponse } from '../models/ui-response';

@Injectable()
export class GetirService extends BaseService {
    constructor(httpClient: HttpClient, router: Router) {
        super(httpClient, router);
    }

    AddOrDeletePaymentMethod(paymentMethodId: string, status: boolean): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/AddOrDeletePaymentMethod`, { paymentMethodId: paymentMethodId, status: status });
        return result$;
    }

    ActivateDeactivateRestaurantPaymentMethods(paymentMethodId: string, status: boolean): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/ActivateDeactivateRestaurantPaymentMethods`, { id: paymentMethodId, active: status });
        return result$;
    }

    ActivateDeactivateProductStatus(productId: string, status: number): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/ActivateDeactivateProductStatus`, { productId: productId, status: status });
        return result$;
    }

    ActivateDeactivateCategoryStatus(productId: string, status: number): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/ActivateDeactivateCategoryStatus`, { productId: productId, status: status });
        return result$;
    }

    ActivateDeactivateOptionProduct(optionProductId: string, status: number): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/ActivateDeactivateOptionProduct`, { optionProductId: optionProductId, status: status });
        return result$;
    }
    GetRestaurantDetails(): Observable<UIResponse<object>> {
        let result$ = this.get<UIResponse<object>>(`Getir/GetRestaurantDetails`);
        return result$;
    }

    UpdateRestaurantAndCourierInfo(payload): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/UpdateRestaurantAndCourierInfo`, payload);
        return result$;
    }

    ActivateDeactivateAltOptions(optionProductId: string, optionCategoryId: number, optionId: number, status: boolean): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/ActivateDeactivateAltOptions`, { optionProductId: optionProductId, optionCategoryId: optionCategoryId, optionId: optionId, status: status });
        return result$;
    }

    ActivateInActiveOptionProducts(optionProductId: string, status: boolean): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/ActivateInActiveOptionProducts`, { optionProductId: optionProductId, status: status });
        return result$;
    }

    ActivateInActiveProductsAsOptions(productId: string, status: boolean): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/ActivateInActiveProductsAsOptions`, { productId: productId, status: status });
        return result$;
    }

    UpdateOptionStatusInSpecificProductAndCategory(productId: string, optionCategoryId: number, optionId: number, status: boolean): Observable<UIResponse<object>> {
        let result$ = this.post<UIResponse<object>>(`Getir/UpdateOptionStatusInSpecificProductAndCategory`, { productId: productId, optionCategoryId, optionId, status: status });
        return result$;
    }
}