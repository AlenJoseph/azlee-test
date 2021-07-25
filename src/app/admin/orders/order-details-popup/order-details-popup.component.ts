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
import { OrderService } from '../../../shared/services/order.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-order-details-popup',
  templateUrl: './order-details-popup.component.html',
  styleUrls: ['./order-details-popup.component.scss']
})
export class OrderDetailsPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private offer: OrderService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['product', 'quantity', 'price', 'total'];
  searchKey: string;
  offerData: any = [];
  totalAmount = 0;
  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    console.log(this.data.dataKey);
    let dataLength = this.data.dataKey;
    console.log(dataLength.length);
    for (let i = 0; i < dataLength.length; i++) {
      this.offerData.push({
        product_name: dataLength[i].product_name,
        quantity: dataLength[i].quantity,
        price: dataLength[i].price,
        total: parseInt(dataLength[i].price) * parseInt(dataLength[i].quantity)
      });
      this.totalAmount =
        this.totalAmount +
        parseInt(dataLength[i].price) * parseInt(dataLength[i].quantity);
    }
    console.log(this.offerData);
    console.log(this.totalAmount);
    // this.offerData = this.data.dataKey;
    this.list = new MatTableDataSource(this.offerData);
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
