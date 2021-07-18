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
import { UsersService } from '../../shared/services/users.service';

import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private users: UsersService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'cover',
    'name',
    'phone',
    'email',
    'orderNo',
    'status',
    'block'
  ];
  searchKey: string;
  shopData: any;

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getusers();
  }

  getusers() {
    this.users.getusers().subscribe(
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

  userStatusChange(items): void {
    this.openDeleteConfirmDialog(items);
  }

  openDeleteConfirmDialog(data): void {
    let blockStatus = false;
    if (data.is_blocked === true) {
      blockStatus = false;
    } else {
      blockStatus = true;
    }

    data = {
      ...data,
      confirmationMessage: `Are you sure want to block the user?`
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users.blockUser(result._id, blockStatus).subscribe(
          (data: any) => {
            this.openSnackBar('User blocked', 'Dismiss');
            this.getusers();
          },
          error => {
            this.openSnackBar(error, 'Dismiss');
          }
        );
      }
    });
  }
}

