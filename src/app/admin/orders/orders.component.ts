import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output
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
import { OrderService } from '../../shared/services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { OrderDetailsPopupComponent } from '../orders/order-details-popup/order-details-popup.component';

import { OrderCustomerPopupComponent } from '../orders/order-customer-popup/order-customer-popup.component';
import { OrderShopPopupComponent } from '../orders/order-shop-popup/order-shop-popup.component';
import { OrderDriverPopupComponent } from '../orders/order-driver-popup/order-driver-popup.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private offer: OrderService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'date',
    'orderId',
    'customerId',
    'shopId',
    'paymentType',
    'orderStatus',
    'address',
    'driver',
    'deliveryStatus',
    'pickupStatus',
    'distance',
    'total',
    'customerPaid',
    'viewDetails',
    'cancel',
    'changeDriver'
  ];
  searchKey: string;
  offerData: any = [];
  driverList: any = [];

  allOfferData: any;
  selectedDate: string;
  list: MatTableDataSource<any>;

  ngOnInit(): void {
    this.selectedDate = 'today';
    setInterval(() => {
      this.getCategories(this.selectedDate);
    }, 60000);
    this.getCategories(this.selectedDate);
    this.getDriverList();
  }

  getCategories(selectedDate) {
    this.offerData = [];
    this.offer.getOrders(selectedDate).subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter(offer => {
          return !offer.is_blocked;
        });
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].delivery_partner_id !== undefined &&
            data[i].delivery_partner_id !== null
          ) {
            if (data[i].shop_id !== null) {
              this.offerData.push({
                created_date: data[i].created_date,
                customer_id: data[i].customer_id['_id'],
                customer_name: data[i].customer_id['name'],
                customer_address: data[i].customer_id['address'],
                azlee_offer_amount: data[i].azlee_offer_amount,
                delivery_partner_id: data[i].delivery_partner_id['_id'],
                delivery_partner_name: data[i].delivery_partner_id['name'],

                is_pickup: data[i].is_pickup,
                order_id: data[i].order_id,
                order_status: data[i].order_status,
                delivery_status: data[i].delivery_status,

                orders: data[i].orders,
                payment_status: data[i].payment_status,
                payment_type: data[i].payment_type,
                shop_id: data[i].shop_id['_id'],
                shop_name: data[i].shop_id['name'],
                km: data[i].km,
                total: data[i].total,
                verification_code: data[i].verification_code,
                _id: data[i]._id
              });
            } else {
              this.offerData.push({
                created_date: data[i].created_date,
                customer_id: data[i].customer_id['_id'],
                customer_name: data[i].customer_id['name'],
                customer_address: data[i].customer_id['address'],
                azlee_offer_amount: data[i].azlee_offer_amount,
                delivery_partner_id: data[i].delivery_partner_id['_id'],
                delivery_partner_name: data[i].delivery_partner_id['name'],

                is_pickup: data[i].is_pickup,
                order_id: data[i].order_id,
                order_status: data[i].order_status,
                delivery_status: data[i].delivery_status,

                orders: data[i].orders,
                payment_status: data[i].payment_status,
                payment_type: data[i].payment_type,
                shop_id: '',
                shop_name: '',
                km: data[i].km,
                total: data[i].total,
                verification_code: data[i].verification_code,
                _id: data[i]._id
              });
            }
          } else {
            if (data[i].shop_id !== null) {
              this.offerData.push({
                created_date: data[i].created_date,
                customer_id: data[i].customer_id['_id'],
                customer_name: data[i].customer_id['name'],
                customer_address: data[i].customer_id['address'],
                azlee_offer_amount: data[i].azlee_offer_amount,
                delivery_partner_id: '',
                delivery_partner_name: '',

                is_pickup: data[i].is_pickup,
                order_id: data[i].order_id,
                order_status: data[i].order_status,
                delivery_status: data[i].delivery_status,

                orders: data[i].orders,
                payment_status: data[i].payment_status,
                payment_type: data[i].payment_type,
                shop_id: data[i].shop_id['_id'],
                shop_name: data[i].shop_id['name'],
                km: data[i].km,
                total: data[i].total,
                verification_code: data[i].verification_code,
                _id: data[i]._id
              });
            } else {
              this.offerData.push({
                created_date: data[i].created_date,
                customer_id: data[i].customer_id['_id'],
                customer_name: data[i].customer_id['name'],
                customer_address: data[i].customer_id['address'],
                azlee_offer_amount: data[i].azlee_offer_amount,
                delivery_partner_id: '',
                delivery_partner_name: '',

                is_pickup: data[i].is_pickup,
                order_id: data[i].order_id,
                order_status: data[i].order_status,
                delivery_status: data[i].delivery_status,

                orders: data[i].orders,
                payment_status: data[i].payment_status,
                payment_type: data[i].payment_type,
                shop_id: '',
                shop_name: '',
                km: data[i].km,
                total: data[i].total,
                verification_code: data[i].verification_code,
                _id: data[i]._id
              });
            }
          }
        }
        this.allOfferData = this.offerData;
        this.list = new MatTableDataSource(this.offerData);
        this.list.sort = this.sort;
        this.list.paginator = this.paginator;
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
  }

  getDriverList() {
    this.offer.getOrderDrivers().subscribe(
      (data: any) => {
        this.driverList = data;
        // filer out all blocked categories
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

  onFilterDateChange(selected) {
    this.selectedDate = selected;
    this.getCategories(selected);
  }

  onFilterChange(selected) {
    const tempOrders = [...this.allOfferData];
    if (selected !== 'all') {
      this.offerData = tempOrders.filter(x => x.order_status === selected);
      this.list = new MatTableDataSource(this.offerData);
      this.list.sort = this.sort;
      this.list.paginator = this.paginator;
    } else {
      this.offerData = tempOrders;
      this.list = new MatTableDataSource(this.offerData);
      this.list.sort = this.sort;
      this.list.paginator = this.paginator;
    }
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

  openOrderDetailDialog(items): void {
    const dialogRef = this.dialog.open(OrderDetailsPopupComponent, {
      width: '1200px',
      maxWidth: '90vw',
      data: {
        dataKey: items.orders
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories(this.selectedDate);
      }
    });
  }

  openCustomerDetailDialog(items): void {
    const dialogRef = this.dialog.open(OrderCustomerPopupComponent, {
      width: '1200px',
      maxWidth: '90vw',
      data: {
        dataKey: items.customer_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories(this.selectedDate);
      }
    });
  }

  openShopDetailDialog(items): void {
    const dialogRef = this.dialog.open(OrderShopPopupComponent, {
      width: '1200px',
      maxWidth: '90vw',
      data: {
        dataKey: items.shop_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCategories(this.selectedDate);
      }
    });
  }

  openDriverDetailDialog(items): void {
    if (items.delivery_partner_id !== '') {
      const dialogRef = this.dialog.open(OrderDriverPopupComponent, {
        width: '1200px',
        maxWidth: '90vw',
        data: {
          dataKey: items.delivery_partner_id
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getCategories(this.selectedDate);
        }
      });
    }
  }

  changeDriver(driverId, orderId): void {
    this.offer.changeDriver(orderId, driverId).subscribe(
      (data: any) => {
        this.getCategories(this.selectedDate);
        this.openSnackBar('Driver Changed', 'Dismiss');
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
  }

  changeStatus(status, orderId, shopId): void {
    console.log(status);
    console.log(orderId);
    console.log(shopId);

    this.offer.changeStatus(status, orderId, shopId).subscribe(
      (data: any) => {
        this.getCategories(this.selectedDate);
        this.openSnackBar('Status Changed', 'Dismiss');
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
  }

  // openDeleteConfirmDialog(data): void {
  //   data = {
  //     ...data,
  //     confirmationMessage: `Are you sure want to cancel the order?`
  //   };

  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: '400px',
  //     data: data
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.offer.cancelOrder(result._id).subscribe(
  //         (data: any) => {
  //           this.getCategories();
  //           this.openSnackBar('Order cancelled', 'Dismiss');
  //         },
  //         error => {
  //           this.openSnackBar(error, 'Dismiss');
  //         }
  //       );
  //     }
  //   });
  // }

  acceptOrder(item): void {
    console.log(item);
    // this.offer.acceptOrder(item._id).subscribe(
    //   (data: any) => {
    //     this.getCategories();
    //     this.openSnackBar('Order cancelled', 'Dismiss');
    //   },
    //   error => {
    //     this.openSnackBar(error, 'Dismiss');
    //   }
    // );
  }
}
