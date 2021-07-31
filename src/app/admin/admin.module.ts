import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { AdminRoutingModule } from './admin-routing.module';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { DataListComponent } from './categories/data-list.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RevenueComponent } from './revenue/revenue.component';
import { ShopListComponent } from './shops/shop-list.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { UsersComponent } from './users/users.component';
import { DriversComponent } from './drivers/drivers.component';
import { OffersComponent } from './offers/offers.component';
import { AddOfferComponent } from './offers/add-offer/add-offer.component';
import { OrdersComponent } from './orders/orders.component';
import { ChartsModule } from 'ng2-charts';
import { OrderDetailsPopupComponent } from './orders/order-details-popup/order-details-popup.component';
import { FazzaComponent } from './fazza/fazza.component';
import { DriverLocationPopupComponent } from './drivers/driver-location-popup/driver-location-popup.component';
import { ShopDetailPopupComponent } from './shops/shop-detail-popup/shop-detail-popup.component';
import { DriverDetailPopupComponent } from './drivers/driver-detail-popup/driver-detail-popup.component';
import { OrderCustomerPopupComponent } from './orders/order-customer-popup/order-customer-popup.component';
import { OrderShopPopupComponent } from './orders/order-shop-popup/order-shop-popup.component';
import { OrderDriverPopupComponent } from './orders/order-driver-popup/order-driver-popup.component';
import { DriverWalletPopupComponent } from './drivers/driver-wallet-popup/driver-wallet-popup.component';
import { ShopWalletPopupComponent } from './shops/shop-wallet-popup/shop-wallet-popup.component';
import { DriverWalletTransactionPopupComponent } from './drivers/driver-wallet-transaction-popup/driver-wallet-transaction-popup.component';
import { ShopWalletTransactionPopupComponent } from './shops/shop-wallet-transaction-popup/shop-wallet-transaction-popup.component';

@NgModule({
  declarations: [
    NavMenuComponent,
    DataListComponent,
    ShopListComponent,
    RevenueComponent,
    ConfirmationDialogComponent,
    AddCategoryComponent,
    UsersComponent,
    DriversComponent,
    OffersComponent,
    AddOfferComponent,
    OrdersComponent,
    OrderDetailsPopupComponent,
    FazzaComponent,
    DriverLocationPopupComponent,
    ShopDetailPopupComponent,
    DriverDetailPopupComponent,
    OrderCustomerPopupComponent,
    OrderShopPopupComponent,
    OrderDriverPopupComponent,
    DriverWalletPopupComponent,
    ShopWalletPopupComponent,
    DriverWalletTransactionPopupComponent,
    ShopWalletTransactionPopupComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDka7KzoEVXU14kHHGYJmcpj_wq0lF3shU'
    })
  ],
  exports: [
    CommonModule,
    NavMenuComponent,
    DataListComponent,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
    // ChartsModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    }
  ]
})
export class AdminModule {}
