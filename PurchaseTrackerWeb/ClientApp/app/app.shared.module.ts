import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PurchaseService } from './service/purchase.service'
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { EditPurchaseComponent } from './components/editPurchase/edit-purchase.component'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        EditPurchaseComponent,
        PurchaseComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'purchase', pathMatch: 'full' },
            { path: 'purchase/create', component: EditPurchaseComponent },
            { path: 'purchase/edit/:purchaseId', component: EditPurchaseComponent },
            { path: 'purchase', component: PurchaseComponent },
            { path: '**', redirectTo: 'purchase' }
        ])
    ],
    providers: [
        PurchaseService
    ]
})
export class AppModuleShared {
}
