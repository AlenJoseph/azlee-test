import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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
import { OrderService } from '../../../shared/services/order.service';

import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-order-shop-popup',
  templateUrl: './order-shop-popup.component.html',
  styleUrls: ['./order-shop-popup.component.scss']
})
export class OrderShopPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private shops: OrderService,
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'cover',
    'name',
    'address',
    'email',
    'phone',
    'rating',
    'category',
    'wallet',
    'verify',
    'promote'
  ];
  shopData: any = [];

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getShop(this.data.dataKey);
  }

  getShop(id) {
    this.shops.getShop(id).subscribe(
      (data: any) => {
        this.shopData.push(data);
        this.list = new MatTableDataSource(this.shopData);
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
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
}
