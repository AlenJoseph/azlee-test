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
import { PromotedService } from '../../shared/services/promoted.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddItemComponent } from './add-item/add-item.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-promoted',
  templateUrl: './promoted.component.html',
  styleUrls: ['./promoted.component.scss']
})
export class PromotedComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private item: PromotedService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['cover', 'name', 'delete'];
  searchKey: string;
  itemData: any;

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.item.getPromotedItems().subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter(item => {
          return !item.is_blocked;
        });
        this.itemData = data;
        console.log(this.itemData);
        this.list = new MatTableDataSource(this.itemData);
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

  deleteItem(element: any) {
    this.openDeleteConfirmDialog(element);
  }

  openDeleteConfirmDialog(data): void {
    data = {
      ...data,
      confirmationMessage: `Are you sure want to delete ${data.name}?`
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item.deleteItem(result._id).subscribe(
          (data: any) => {
            this.openSnackBar('Item deleted', 'Dismiss');
            this.getCategories();
          },
          error => {
            this.openSnackBar(error, 'Dismiss');
          }
        );
      }
    });
  }

  openAddItemDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories();
      }
    });
  }
}

