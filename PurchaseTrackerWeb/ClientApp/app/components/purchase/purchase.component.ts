import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService, Purchase, Category } from '../../service/purchase.service'

@Component({
    selector: 'purchase',
    templateUrl: './purchase.component.html'
})

export class PurchaseComponent {
    public purchases: Purchase[];
    public totalTransactions: number;
    public totalAmount: number;
    public averageAmount: number;

    constructor(public http: Http, private _router: Router, private _purchaseService: PurchaseService) {
        this.getPurchases();
    }

    public getPurchases() {
        this._purchaseService.getPurchases().subscribe(
            data => {
                this.purchases = data;

                this.totalAmount = 0;

                if (this.purchases) {
                    this.totalTransactions = this.purchases.length;
                    for (var i = 0; i < this.purchases.length; i++) {
                        this.totalAmount += this.purchases[i].amount;
                    }
                    this.averageAmount = this.totalAmount / this.totalTransactions;
                }
                else {
                    this.averageAmount = 0;
                    this.totalTransactions = 0;
                }
            }
        )
    }

    public delete(purchaseId: number) {
        var ans = confirm("Do you want to delete purchase with ID: " + purchaseId);
        if (ans) {
            this._purchaseService.deletePurchase(purchaseId).subscribe((data) => {
                this.getPurchases();
            }, error => console.error(error))
        }
    }
}
