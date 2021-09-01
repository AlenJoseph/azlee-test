import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { ShopsService } from '../../shared/services/shops.service';
import { ShopWalletPopupComponent } from '../shops/shop-wallet-popup/shop-wallet-popup.component';

import { ShopDetailPopupComponent } from '../shops/shop-detail-popup/shop-detail-popup.component';

import { ShopWalletTransactionPopupComponent } from '../shops/shop-wallet-transaction-popup/shop-wallet-transaction-popup.component';

import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import * as _ from 'lodash';
import { elementAt } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-fazza-partner',
  templateUrl: './fazza-partner.component.html',
  styleUrls: ['./fazza-partner.component.scss']
})
export class FazzaPartnerComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private shops: ShopsService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'cover',
    'name',
    // 'address',
    // 'email',
    // 'phone',
    'rating',
    // 'category',
    'wallet',
    'verify',
    'promote',
    'open',
    'actions',
    'promoteBtn',
    'account',
    'updateWallet',
    'walletTransaction'
  ];
  searchKey: string;
  partnerData: any;

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getPartners();
  }

  getPartners() {
    this.shops.getfazzaPartners().subscribe(
      (data: any) => {
        this.partnerData = data;
        this.list = new MatTableDataSource(this.partnerData);
        this.list.sort = this.sort;
        this.list.paginator = this.paginator;
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.list.filter = this.searchKey.trim().toLowerCase();
  }

  openSnackBar(message: string, action: string) {
    let _horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    let _verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    let snackBarRef = this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: _horizontalPosition,
      verticalPosition: _verticalPosition
    });

    snackBarRef.afterDismissed().subscribe(() => {});
  }

  openClick(element: any) {
    element = {
      ...element,
      confirmationMessage: `Are you sure want to open/close ${element.name}?`
    };
    this.openClickConfirmDialog(element);
  }

  openClickConfirmDialog(data): void {
    console.log(data.is_open);

    let open = false;
    if (data.is_open === true) {
      open = false;
    } else {
      open = true;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shops.openCloseShop(data._id, open).subscribe(
          (data: any) => {
            this.openSnackBar('Shop Opened/Closed', 'Dismiss');
            this.getPartners();
          },
          error => {
            this.openSnackBar(error, 'Dismiss');
          }
        );
      }
    });
  }

  verifyShop(element: any) {
    element = {
      ...element,
      confirmationMessage: `Are you sure want to verify ${element.name}?`
    };
    this.openVerifyShopConfirmDialog(element);
  }

  openVerifyShopConfirmDialog(data): void {
    let verify = false;
    if (data.is_active === true) {
      verify = false;
    } else {
      verify = true;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shops.verifyShop(data._id, verify).subscribe(
          (data: any) => {
            this.openSnackBar('Shop verified', 'Dismiss');
            this.getPartners();
          },
          error => {
            this.openSnackBar(error, 'Dismiss');
          }
        );
      }
    });
  }

  promoteShop(element: any) {
    element = {
      ...element,
      confirmationMessage: `Are you sure want to promote ${element.name}?`
    };
    this.openPromoteConfirmDialog(element);
  }

  openPromoteConfirmDialog(data): void {
    let promoted = false;
    if (data.is_promted === true) {
      promoted = false;
    } else {
      promoted = true;
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shops.promoteShop(data._id, promoted).subscribe(
          (data: any) => {
            this.openSnackBar('Shop promoted', 'Dismiss');
            this.getPartners();
          },
          error => {
            this.openSnackBar(error, 'Dismiss');
          }
        );
      }
    });
  }

  showAccount(items): void {
    const dialogRef = this.dialog.open(ShopDetailPopupComponent, {
      width: '1200px',
      maxWidth: '90vw',
      data: {
        dataKey: items
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartners();
      }
    });
  }

  updateWallet(items): void {
    const dialogRef = this.dialog.open(ShopWalletPopupComponent, {
      width: '400px',
      maxWidth: '90vw',
      data: {
        dataKey: items
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPartners();
    });
  }

  walletTransaction(items): void {
    const dialogRef = this.dialog.open(ShopWalletTransactionPopupComponent, {
      width: '1200px',
      maxWidth: '90vw',
      data: {
        dataKey: items._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPartners();
    });
  }
}
