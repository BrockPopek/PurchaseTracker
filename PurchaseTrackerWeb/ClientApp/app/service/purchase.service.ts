import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PurchaseService {

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    getCategories() {
        return this.http.get(this.baseUrl + 'api/purchase/getcategories')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getPurchases() {
        return this.http.get(this.baseUrl + 'api/purchase/getall')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getPurchaseById(id: number) {
        let param = {
            params: {
                purchaseID: id
            }
        };

        return this.http.get(this.baseUrl + "api/purchase/get", param)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    savePurchase(purchase: Purchase) {
        return this.http.post(this.baseUrl + 'api/purchase/create', purchase)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    updatePurchase(purchase: Purchase) {
        return this.http.put(this.baseUrl + 'api/purchase/edit', purchase)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    deletePurchase(id: number) {
        let param = {
            params: {
                purchaseID: id
            }
        };

        return this.http.delete(this.baseUrl + "api/purchase/delete", param)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}

export interface Purchase {
    purchaseId: number;
    categoryId: number;
    payeeName: string;
    amount: number;
    purchaseDate: Date;
    memo: string;
    category: Category;
}

export interface Category {
    categoryId: number;
    categoryName: string;
}
