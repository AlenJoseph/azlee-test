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
import { CategoryService } from '../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private category: CategoryService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'cover',
    'name',
    'description',
    'creationDate',
    'delete',
  ];
  searchKey: string;
  categoryData: any;

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.category.getCategories().subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter((category) => {
          return !category.is_blocked;
        });

        this.categoryData = data;
        this.list = new MatTableDataSource(this.categoryData);
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

  deleteCategory(element: any) {
    this.openDeleteConfirmDialog(element);
  }

  openDeleteConfirmDialog(data): void {
    data = {
      ...data,
      confirmationMessage: `Are you sure want to delete ${data.name}?`,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.category.deleteCategory(result._id).subscribe(
          (data: any) => {
            this.openSnackBar('Category deleted', 'Dismiss');
            this.getCategories();
          },
          (error) => {
            this.openSnackBar(error, 'Dismiss');
          }
        );
      }
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCategories();
      }
    });
  }
}
