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
import { CategoryService } from '../../../shared/services/category.service';
import * as _ from 'lodash';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  newCategoryForm: FormGroup;
  imageError: string;
  imageFilename: string;
  imageBase64: string;
  isSubmitting: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private category: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newCategoryForm = this.formBuilder.group({
      categoryName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });
    this.isSubmitting = false;
  }

  onOpenFiles() {
    const fileInput = this.fileInput.nativeElement;
    this.newCategoryForm.controls.image.markAsTouched();
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
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          this.imageBase64 = imgBase64Path;
          // reference: https://www.freakyjolly.com/angular-input-file-image-file-upload-to-base64-tutorial-by-example/
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onSubmit() {
    this.isSubmitting = true;
    this.category
      .createCategory(
        this.newCategoryForm.get('categoryName').value,
        this.newCategoryForm.get('description').value,
        this.imageBase64
      )
      .subscribe(
        (data: any) => {
          this.openSnackBar('Category Added', 'Dismiss');
          this.isSubmitting = false;
          this.dialogRef.close({ success: true });
        },
        (error) => {
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
      verticalPosition: _verticalPosition,
    });
  }
}
