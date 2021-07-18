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
  selector: 'app-shop-wallet-popup',
  templateUrl: './shop-wallet-popup.component.html',
  styleUrls: ['./shop-wallet-popup.component.scss']
})
export class ShopWalletPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private shop: ShopsService
  ) {}

  shopData: any = [];
  amount = '';
  note = '';

  ngOnInit(): void {
    this.shopData = this.data.dataKey;
    // this.amount = this.shopData.wallet
  }

  updateWallet() {
    this.shop.walletUpdate(this.amount, this.shopData._id, this.note).subscribe(
      (data: any) => {
        this.openSnackBar('Wallet updated', 'Dismiss');
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
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
}
