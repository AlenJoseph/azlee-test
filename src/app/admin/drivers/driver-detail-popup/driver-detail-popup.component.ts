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
  selector: 'app-driver-detail-popup',
  templateUrl: './driver-detail-popup.component.html',
  styleUrls: ['./driver-detail-popup.component.scss']
})
export class DriverDetailPopupComponent implements OnInit {
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

  displayedColumns: string[] = [
    'creationDate',
    'orderid',
    'originalAmout',
    'discount',
    'paidAmount',
    'driverFee',
    'azleeShopCommission',
    'azleeDriverCommission',
    'type',
    'pickup',
    'totalCommission'
  ];

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getCategories(this.data.dataKey);
  }

  getCategories(id) {
    this.driver.getDriverDetails(id).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.driverData.push({
          azlee_commision: data[i].azlee_commision,
          azlee_driver_commision: data[i].azlee_driver_commision,
          azlee_shop_commision: data[i].azlee_shop_commision,
          created_date: data[i].created_date,
          delivery_fee: data[i].delivery_fee,
          discount: data[i].discount,
          is_pickup: data[i].is_pickup,
          order_id: data[i].order_id,
          orginal_total: data[i].orginal_total,
          payment_type: data[i].payment_type,
          shop_fee: data[i].shop_fee,
          total: data[i].total,
          _id: data[i]._id,
          azlee_total_commission: (data[i].orginal_total - data[i].delivery_fee).toFixed(2)
        });
      }

      // this.driverData = data;
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
}
