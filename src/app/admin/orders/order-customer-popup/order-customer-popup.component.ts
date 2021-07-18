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
  selector: 'app-order-customer-popup',
  templateUrl: './order-customer-popup.component.html',
  styleUrls: ['./order-customer-popup.component.scss']
})
export class OrderCustomerPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private users: OrderService,
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'cover',
    'name',
    'phone',
    'email',
    'orderNo',
    'status'
  ];
  shopData: any = [];

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getuser(this.data.dataKey);
  }

  getuser(id) {
    this.users.getCustomer(id).subscribe(
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
