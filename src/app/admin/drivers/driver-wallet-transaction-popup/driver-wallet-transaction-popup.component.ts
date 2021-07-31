import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  Inject
} from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { DriversService } from '../../../shared/services/drivers.service';

@Component({
  selector: 'app-driver-wallet-transaction-popup',
  templateUrl: './driver-wallet-transaction-popup.component.html',
  styleUrls: ['./driver-wallet-transaction-popup.component.scss']
})
export class DriverWalletTransactionPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private driver: DriversService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string;
  driverData: any = [];
  selectedDate: string;
  displayedColumns: string[] = [
    'creationDate',
    'totalAmount',
    'transactionType'
  ];

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.selectedDate = 'today';
    this.getCategories(this.selectedDate, this.data.dataKey);
  }

  getCategories(selectedDate, id) {
    this.driver
      .getDriverWalletTransactionDetails(selectedDate, id)
      .subscribe((data: any) => {
        this.driverData = data;
        this.list = new MatTableDataSource(this.driverData);
        this.list.sort = this.sort;
        this.list.paginator = this.paginator;
      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.list.filter = this.searchKey.trim().toLowerCase();
  }

  onFilterDateChange(selected) {
    this.selectedDate = selected;
    this.getCategories(this.selectedDate, this.data.dataKey);
  }
}

