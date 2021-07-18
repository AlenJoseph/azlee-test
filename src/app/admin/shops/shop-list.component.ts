import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ShopsService } from '../../shared/services/shops.service';
import { ShopWalletPopupComponent } from '../shops/shop-wallet-popup/shop-wallet-popup.component';

import { ShopDetailPopupComponent } from '../shops/shop-detail-popup/shop-detail-popup.component';

import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import * as _ from 'lodash';
import { elementAt } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
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
    'actions',
    'promoteBtn',
    'account',
    'updateWallet'
  ];
  searchKey: string;
  shopData: any;

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getShops();
  }

  getShops() {
    this.shops.getShops().subscribe(
      (data: any) => {
        this.shopData = data;
        this.list = new MatTableDataSource(this.shopData);
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
            this.getShops();
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
            this.getShops();
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
        this.getShops();
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
        this.getShops();
    });
  }
}
