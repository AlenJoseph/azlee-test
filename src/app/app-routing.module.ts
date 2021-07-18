import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminAuthGuard } from './shared/guards/admin-auth.guard'
import { GeneralAuthGuard } from './shared/guards/general-auth.guard'

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent, pathMatch: 'full', canActivate: [GeneralAuthGuard], },
  { path: 'signup', component: AuthenticationComponent, pathMatch: 'full', canActivate: [GeneralAuthGuard], },
  {
    path: '',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
