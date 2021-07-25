import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
import { RevenueService } from '../../shared/services/revenue.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class RevenueComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];
  public lineChartLabels: Label[] = ['J', 'F', 'M', 'A', 'M', 'J', 'J'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: 'white',
      callbacks: {
        labelTextColor: function(tooltipItem, chart) {
          return 'black';
        }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          ticks: {
            fontColor: 'white' // x axe labels (can be hexadecimal too)
          },
          gridLines: {
            color: '#ffffff1f' // grid line color (can be removed or changed)
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            fontColor: 'white', // y axes numbers color (can be hexadecimal too)
            min: 0,
            beginAtZero: true
          },
          gridLines: {
            color: '#ffffff1f' // grid line color (can be removed or changed)
          }
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: 'transparent'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: 'white',
      callbacks: {
        labelTextColor: function(tooltipItem, chart) {
          return 'black';
        }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          ticks: {
            fontColor: 'white' // x axe labels (can be hexadecimal too)
          },
          gridLines: {
            color: '#ffffff1f' // grid line color (can be removed or changed)
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            fontColor: 'white', // y axes numbers color (can be hexadecimal too)
            min: 0,
            beginAtZero: true
          },
          gridLines: {
            color: '#ffffff1f' // grid line color (can be removed or changed)
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012'
  ];
  public barChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: 'white'
    }
  ];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];

  constructor(
    private snackBar: MatSnackBar,
    private category: RevenueService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'creationDate',
    'orderid',
    'entity',
    'amount',
    'amountPaid',
    'amountDue',
    'currency',
    'orderReceipt',
    'status',
    'orderAt',
    'updatedDate'
  ];

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');
  expandedElement: any;

  searchKey: string;
  dataPayment: any = [];

  list: MatTableDataSource<any>;

  displayedColumnsWallet: string[] = [
    'creationDate',
    'orderid',
    'originalAmout',
    'discount',
    'totalAmount',
    'paidAmount',
    'shopFee',
    'azleeShopCommission',
    'azleeDriverCommission',
    'azleeTotalCommission',
    'km',
    'type',
    'pickup'
  ];
  searchKeyWallet: string;
  dataWallet: any = [];

  listWallet: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getPayment();
    this.getWallet();
  }

  getPayment() {
    this.category.getPaymentInfo().subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter(category => {
          return !category.is_blocked;
        });
        this.dataPayment = data;
        this.list = new MatTableDataSource(this.dataPayment);
        this.list.sort = this.sort;
        this.list.paginator = this.paginator;
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

  getWallet() {
    this.category.getWalletInfo().subscribe(
      (data: any) => {
        // filer out all blocked categories
        data = data.filter(category => {
          return !category.is_blocked;
        });
        this.dataWallet = data;
        this.listWallet = new MatTableDataSource(this.dataWallet);
        this.listWallet.sort = this.sort;
        this.listWallet.paginator = this.paginator;
      },
      error => {
        this.openSnackBar(error, 'Dismiss');
      }
    );
  }

  // onSearchClear() {
  //   this.searchKeyWallet = '';
  //   this.applyFilter();
  // }

  applyFilterWallet() {
    this.listWallet.filter = this.searchKeyWallet.trim().toLowerCase();
  }
}
