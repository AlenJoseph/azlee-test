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
import { OffersService } from '../../shared/services/offer.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private offer: OffersService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'cover',
    'description',
    'code',
    'amount',
    'percentage',
    'creationDate',
    'delete',
  ];
  searchKey: string;
  offerData: any;

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getCategories();

  }

  getCategories() {
    this.offer.getOffers().subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter((offer) => {
          return !offer.is_blocked;
        });
        this.offerData = data;
        this.list = new MatTableDataSource(this.offerData);
        this.list.sort = this.sort;
        this.list.paginator = this.paginator;
      },
      (error) => {
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
      verticalPosition: _verticalPosition,
    });

    snackBarRef.afterDismissed().subscribe(() => {
    });
  }

  deleteOffer(element: any) {
    this.openDeleteConfirmDialog(element);
  }

  openDeleteConfirmDialog(data): void {
    data = {
      ...data,
      confirmationMessage: `Are you sure want to delete ${data.offer_code}?`,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.offer.deleteOffer(result._id).subscribe(
          (data: any) => {
            this.openSnackBar('Offer deleted', 'Dismiss');
            this.getCategories();
          },
          (error) => {
            this.openSnackBar(error, 'Dismiss');
          }
        );
      }
    });
  }

  openAddOfferDialog(): void {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCategories();
      }
    });
  }
}
