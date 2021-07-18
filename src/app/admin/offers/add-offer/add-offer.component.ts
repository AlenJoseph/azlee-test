import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { OffersService } from '../../../shared/services/offer.service';
import * as _ from 'lodash';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  newOfferForm: FormGroup;
  imageError: string;
  imageFilename: string;
  imageBase64: string;
  isSubmitting: boolean;
  shopList: any = [];
  productList: any = [];

  constructor(
    public dialogRef: MatDialogRef<AddOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private offer: OffersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newOfferForm = this.formBuilder.group({
      description: [null, [Validators.required]],
      offerCode: [null, [Validators.required]],
      offerAmount: [null, [Validators.required]],
      offerPercentage: [null, [Validators.required]],
      offerShop: [null],
      offerProduct: [null],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      image: [null, [Validators.required]]
    });
    this.isSubmitting = false;
    this.getShops();
  }

  getShops() {
    this.offer.getShops().subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter(offer => {
          return !offer.is_blocked;
        });
        this.shopList = data;
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
  }

  shopChange(shopId): void {
            console.log(shopId);

    this.offer.getProducts(shopId).subscribe(
      (data: any) => {
        data = data.filter(offer => {
          return !offer.is_blocked;
        });
        console.log(data);
        this.productList = data;
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
  }


  onOpenFiles() {
    const fileInput = this.fileInput.nativeElement;
    this.newOfferForm.controls.image.markAsTouched();
    fileInput.click();
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    this.imageFilename = null;

    if (fileInput.target.files && fileInput.target.files[0]) {
      const allowed_types = ['image/png', 'image/jpeg'];
      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed (JPG/PNG )';
        return false;
      }
      this.imageFilename = fileInput.target.files[0].name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.imageBase64 = imgBase64Path;
          // reference: https://www.freakyjolly.com/angular-input-file-image-file-upload-to-base64-tutorial-by-example/
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onSubmit() {
    console.log('here')
    var from = new Date(this.newOfferForm.get('fromDate').value),
      mnth = ('0' + (from.getMonth() + 1)).slice(-2),
      day = ('0' + from.getDate()).slice(-2);
    var fromDate = [day, mnth, from.getFullYear()].join('-');

    var to = new Date(this.newOfferForm.get('toDate').value),
      mnth = ('0' + (to.getMonth() + 1)).slice(-2),
      day = ('0' + to.getDate()).slice(-2);
    var toDate = [day, mnth, to.getFullYear()].join('-');

    this.isSubmitting = true;
    this.offer
      .createOffer(
        this.newOfferForm.get('description').value,
        this.newOfferForm.get('offerCode').value,
        this.newOfferForm.get('offerAmount').value,
        this.newOfferForm.get('offerPercentage').value,
        this.newOfferForm.get('offerShop').value,
        this.newOfferForm.get('offerProduct').value,
        fromDate,
        toDate,
        this.imageBase64
      )
      .subscribe(
        (data: any) => {
          this.openSnackBar('Offer Added', 'Dismiss');
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
