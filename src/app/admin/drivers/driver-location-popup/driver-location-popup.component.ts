import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  Inject
} from '@angular/core';
import { AgmCoreModule } from '@agm/core';
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
import * as _ from 'lodash';
@Component({
  selector: 'app-driver-location-popup',
  templateUrl: './driver-location-popup.component.html',
  styleUrls: ['./driver-location-popup.component.scss']
})
export class DriverLocationPopupComponent implements OnInit {
  zoom: number = 10;

  // initial center position for the map
  lat: number;
  lng: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.lat = parseFloat(this.data.dataKey.la);
    this.lng = parseFloat(this.data.dataKey.lo);
  }
}
