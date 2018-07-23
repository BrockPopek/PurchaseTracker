import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService, Purchase, Category } from '../../service/purchase.service';

@Component({
    selector: 'edit-purchase',
    templateUrl: './edit-purchase.component.html'
})

export class EditPurchaseComponent implements OnInit {
    title: string = "Create";
    purchaseId: number;
    errorMessage: any;
    purchase: Purchase;
    categories: Category[];
    categoryIdInvalid: boolean = false;
    payeeNameInvalid: boolean = false;
    amountInvalid: boolean = false;
    purchaseDateInvalid: boolean = false;

    constructor(private _avRoute: ActivatedRoute,
        private _purchaseService: PurchaseService, private _router: Router) {
        if (this._avRoute.snapshot.params["purchaseId"]) {
            this.purchaseId = this._avRoute.snapshot.params["purchaseId"];
        }
    }

    ngOnInit() {
        if (this.purchaseId > 0) {
            this.title = "Edit";
            this._purchaseService.getPurchaseById(this.purchaseId)
                .subscribe(resp => {
                    this.purchase = resp;
                }
                    , error => this.errorMessage = error);
        }
        else {
            this.purchase = <Purchase>({});
        }
        this.getCategories();
    }

    public getCategories() {
        this._purchaseService.getCategories().subscribe(
            data => {
                this.categories = data;
            }
        )
    }

    public save() {
        if (this.validate()) {
            if (this.title == "Create") {
                this._purchaseService.savePurchase(this.purchase)
                    .subscribe((data) => {
                        this._router.navigate(['/purchase']);
                    }, error => this.errorMessage = error)
            }
            else if (this.title == "Edit") {
                this._purchaseService.updatePurchase(this.purchase)
                    .subscribe((data) => {
                        this._router.navigate(['/purchase']);
                    }, error => this.errorMessage = error)
            }
        }
    }

    public cancel() {
        this._router.navigate(['/purchase']);
    }

    public setCurrency() {
        this.purchase.amount = parseFloat(this.purchase.amount.toFixed(2));
    }

    private validate(): boolean {
        this.categoryIdInvalid = !this.purchase.categoryId;

        this.payeeNameInvalid = (!this.purchase.payeeName || this.purchase.payeeName === '');

        this.amountInvalid = !this.purchase.amount;

        this.purchaseDateInvalid = (!this.purchase.purchaseDate || new Date(this.purchase.purchaseDate) < new Date("1/1/2000"));

        return (!this.payeeNameInvalid && !this.amountInvalid && !this.categoryIdInvalid && !this.purchaseDateInvalid);
    }
}
