import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
@Component({
  selector: 'app-pharmacy-image-popup',
  templateUrl: './pharmacy-image-popup.component.html',
  styleUrls: ['./pharmacy-image-popup.component.scss']
})
export class PharmacyImagePopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  image: "";

  ngOnInit(): void {
    this.image = this.data.dataKey
    console.log(this.data.dataKey);
  }
}


