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
import { DriversService } from '../../shared/services/drivers.service';

import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DriverLocationPopupComponent } from '../drivers/driver-location-popup/driver-location-popup.component';
import { DriverDetailPopupComponent } from '../drivers/driver-detail-popup/driver-detail-popup.component';
import { DriverWalletPopupComponent } from '../drivers/driver-wallet-popup/driver-wallet-popup.component';

DriverDetailPopupComponent;
import * as _ from 'lodash';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private drivers: DriversService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'cover',
    'name',
    'phone',
    'workStatus',
    'orderNo',
    'deliveryStatus',
    'wallet',
    'blockedStatus',
    'status',
    'actions',
    'location',
    'account',
    'updateWallet'
  ];
  searchKey: string;
  shopData: any;

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getdrivers();
  }

  getdrivers() {
    this.drivers.getdrivers().subscribe(
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

  verifyDriver(element: any) {
    element = {
      ...element,
      confirmationMessage: `Are you sure want to verify ${element.name}?`
    };
    this.openVerifyDriverConfirmDialog(element);
  }

  openVerifyDriverConfirmDialog(data): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.drivers.verifyDriver(data._id).subscribe(
          (data: any) => {
            this.openSnackBar('Driver verified', 'Dismiss');
            this.getdrivers();
          },
          error => {
            this.openSnackBar(error, 'Dismiss');
          }
        );
      }
    });
  }

  location(items: any) {
    const dialogRef = this.dialog.open(DriverLocationPopupComponent, {
      width: '1000px',
      data: {
        dataKey: items.location
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getdrivers();
      }
    });
  }

  showAccount(items): void {
    const dialogRef = this.dialog.open(DriverDetailPopupComponent, {
      width: '1200px',
      maxWidth: '90vw',
      data: {
        dataKey: items._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getdrivers();
      }
    });
  }

  updateWallet(items): void {
    const dialogRef = this.dialog.open(DriverWalletPopupComponent, {
      width: '400px',
      maxWidth: '90vw',
      data: {
        dataKey: items
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.getdrivers();
    });
  }
}

