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
import { BidsPopupComponent } from '../fazza/bids-popup/bids-popup.component'

import { FazzaService } from '../../shared/services/fazza.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-fazza',
  templateUrl: './fazza.component.html',
  styleUrls: ['./fazza.component.scss']
})
export class FazzaComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private category: FazzaService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'contact',
    'description',
    // 'customer',
    'from',
    'to',
    // 'driver',
    'fee',
    // 'paymentstatus',
    'fazzastatus',
    'vehlicletype',
    'bids'
  ];
  searchKey: string;
  fazzaData: any = [];

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getFazza();
  }

  getFazza() {
    this.category.getFazza().subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter(category => {
          return !category.is_blocked;
        });
        for (let i = 0; i < data.length; i++) {
          this.fazzaData.push({
            bids: data[i].bids,
            customer: data[i].customer_id['name'],
            description: data[i].description,
            customer_no: data[i].customer_id['phone_number'],
            fazza_fee: data[i].fazza_fee,
            fazza_status: data[i].fazza_status,
            from_address: data[i].from_address,
            to_address: data[i].to_address,
            vehicle_type: data[i].vehicle_type,
            _id: data[i]._id
          });
        }
        this.list = new MatTableDataSource(this.fazzaData);
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

  viewBids(items): void {
    const dialogRef = this.dialog.open(BidsPopupComponent, {
      width: '1200px',
      maxWidth: '90vw',
      data: {
        dataKey: items.bids
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFazza();
    });
  }
}
