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
  selector: 'app-driver-wallet-popup',
  templateUrl: './driver-wallet-popup.component.html',
  styleUrls: ['./driver-wallet-popup.component.scss']
})
export class DriverWalletPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private driver: DriversService
  ) {}

  driverData: any = [];
  amount = '';
  note = '';

  ngOnInit(): void {
    this.driverData = this.data.dataKey;
    // this.amount = this.driverData.wallet;
  }

  updateWallet() {
    this.driver
      .walletUpdate(this.amount, this.driverData._id, this.note)
      .subscribe(
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
