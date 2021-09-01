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
import { BidsPopupComponent } from '../fazza/bids-popup/bids-popup.component';

import { PharmacyService } from '../../shared/services/pharmacy.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private pharmacy: PharmacyService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'created_date',
    'customerName',
    'customerContact',
    'customerStatus',
    'notes',
    'orderStatus',
    'updated_date',
    'shopName',
    'shopContact',
    'image'
  ];
  searchKey: string;
  pharmacyData: any = [];
  allPharmacyData: any;
  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getFazza();
  }

  getFazza() {
    this.pharmacy.getPharmacy().subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter(category => {
          return !category.is_blocked;
        });
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          if (data[i].shop_id !== null) {
            this.pharmacyData.push({
              created_date: data[i].created_date,
              customer: data[i].customer_id['name'],
              customer_no: data[i].customer_id['phone_number'],
              customer_status: data[i].customer_status,
              notes: data[i].notes,
              order_status: data[i].order_status,
              orders_image: data[i].orders_image,
              updated_date: data[i].updated_date,
              shop: data[i].shop_id['name'],
              shop_no: data[i].shop_id['phone_number'],
              _id: data[i]._id
            });
          }
        }
        this.allPharmacyData = this.pharmacyData;

        this.list = new MatTableDataSource(this.pharmacyData);
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

  onFilterChange(selected) {
    const tempData = [...this.allPharmacyData];
    if (selected !== 'all') {
      this.pharmacyData = tempData.filter(x => x.customer_status === selected);
      this.list = new MatTableDataSource(this.pharmacyData);
      this.list.sort = this.sort;
      this.list.paginator = this.paginator;
    } else {
      this.pharmacyData = tempData;
      this.list = new MatTableDataSource(this.pharmacyData);
      this.list.sort = this.sort;
      this.list.paginator = this.paginator;
    }
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

  viewImages(item): void {
    console.log(item);
    window.open(item, '_blank');
  }
}

