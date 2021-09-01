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

@Component({
  selector: 'app-bids-popup',
  templateUrl: './bids-popup.component.html',
  styleUrls: ['./bids-popup.component.scss']
})
export class BidsPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string;
  bidsData: any = [];
  displayedColumns: string[] = [
    'name',
    'phone',
    'amount'
  ];

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getCategories(this.data.dataKey);
  }

  getCategories(data) {
    // this.bidsData = data;

    for (let i = 0; i < data.length; i++) {
      this.bidsData.push({
        amount: data[i].amount,
        name: data[i].fazza_driver_id['name'],
        phone_number: data[i].fazza_driver_id['phone_number'],
        _id: data[i]._id
      });
    }
        console.log(this.bidsData);

    this.list = new MatTableDataSource(this.bidsData);
    this.list.sort = this.sort;
    this.list.paginator = this.paginator;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.list.filter = this.searchKey.trim().toLowerCase();
  }
}


