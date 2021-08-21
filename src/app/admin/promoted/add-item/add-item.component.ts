import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { PromotedService } from '../../../shared/services/promoted.service';
import * as _ from 'lodash';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  newItemForm: FormGroup;
  isSubmitting: boolean;
  shopList: any = [];
  productList: any = [];

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private item: PromotedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newItemForm = this.formBuilder.group({
      itemShop: [null, [Validators.required]],
      itemProduct: [null, [Validators.required]]
    });
    this.isSubmitting = false;
    this.getShops();
  }

  getShops() {
    this.item.getShops().subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter(item => {
          return !item.is_blocked;
        });
        this.shopList = data;
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
  }

  shopChange(shopId): void {
    this.item.getProducts(shopId).subscribe(
      (data: any) => {
        data = data.filter(item => {
          return !item.is_blocked;
        });
        console.log(data);
        this.productList = data;
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
  }

  onSubmit() {
    this.isSubmitting = true;
    this.item
      .createItem(this.newItemForm.get('itemProduct').value)
      .subscribe(
        (data: any) => {
          this.openSnackBar('Item Added', 'Dismiss');
          this.isSubmitting = false;
          this.dialogRef.close({ success: true });
        },
        error => {
          this.openSnackBar(error, 'Dismiss');
          this.isSubmitting = false;
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    let _horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    let _verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    let snackBarRef = this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: _horizontalPosition,
      verticalPosition: _verticalPosition
    });
  }
}
