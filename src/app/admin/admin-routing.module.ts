import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { DataListComponent } from './categories/data-list.component';
import { ShopListComponent } from './shops/shop-list.component';
import { UsersComponent } from './users/users.component';
import { DriversComponent } from './drivers/drivers.component';
import { OffersComponent } from './offers/offers.component';
import { OrdersComponent } from './orders/orders.component';
import { RevenueComponent } from './revenue/revenue.component';
import { FazzaComponent } from './fazza/fazza.component';
import { PromotedComponent } from './promoted/promoted.component';

const routes: Routes = [
  {
    path: '',
    component: NavMenuComponent,
    children: [
      {
        path: 'revenue',
        component: RevenueComponent,
        pathMatch: 'full'
      },
      {
        path: 'categories',
        component: DataListComponent,
        pathMatch: 'full'
      },
      {
        path: 'shops',
        component: ShopListComponent,
        pathMatch: 'full'
      },
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full'
      },
      {
        path: 'drivers',
        component: DriversComponent,
        pathMatch: 'full'
      },
      {
        path: 'offers',
        component: OffersComponent,
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: OrdersComponent,
        pathMatch: 'full'
      },
      {
        path: 'fazza',
        component: FazzaComponent,
        pathMatch: 'full'
      },
      {
        path: 'promoted',
        component: PromotedComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/revenue',
        pathMatch: 'full'
      },

      {
        path: 'revenue',
        redirectTo: '/revenue',
        pathMatch: 'full'
      },
      {
        path: 'categories',
        redirectTo: '/categories',
        pathMatch: 'full'
      },
      {
        path: 'shops',
        redirectTo: '/shops',
        pathMatch: 'full'
      },
      {
        path: 'users',
        redirectTo: '/users',
        pathMatch: 'full'
      },
      {
        path: 'drivers',
        redirectTo: '/drivers',
        pathMatch: 'full'
      },
      {
        path: 'offers',
        redirectTo: '/offers',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        redirectTo: '/orders',
        pathMatch: 'full'
      },
      {
        path: 'fazza',
        redirectTo: '/fazza',
        pathMatch: 'full'
      },
      {
        path: 'promoted',
        redirectTo: '/promoted',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/revenue',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
