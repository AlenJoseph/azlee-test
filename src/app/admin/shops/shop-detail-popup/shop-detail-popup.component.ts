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
import { ShopsService } from '../../../shared/services/shops.service';
@Component({
  selector: 'app-shop-detail-popup',
  templateUrl: './shop-detail-popup.component.html',
  styleUrls: ['./shop-detail-popup.component.scss']
})
export class ShopDetailPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private shop: ShopsService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'creationDate',
    'orderid',
    'originalAmout',
    'discount',
    'totalAmount',
    'paidAmount',
    'shopFee',
    'azleeShopCommission',
    'azleeDriverCommission',
    'type',
    'pickup'
  ];
  searchKey: string;
  shopData: any = [];
  shopDetail: any;

  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.shopDetail = this.data.dataKey;
    this.getCategories(this.data.dataKey._id);
  }

  getCategories(id) {
    this.shop.getShopDetails(id).subscribe((data: any) => {
      // this.shopData = data;

      for (let i = 0; i < data.length; i++) {
        this.shopData.push({
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
          azlee_offer_amount: data[i].azlee_offer_amount,
          customer_delivery_charge: data[i].customer_delivery_charge,
          _id: data[i]._id,
          azlee_total_commission: (
            data[i].orginal_total - data[i].shop_fee
          ).toFixed(2)
        });
      }

      this.list = new MatTableDataSource(this.shopData);
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
