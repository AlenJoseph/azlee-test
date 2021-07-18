import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from '../services/cookie.service'

@Injectable({
  providedIn: 'root'
})
export class GeneralAuthGuard implements CanActivate{
  constructor(private cookie: CookieService, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!!this.cookie.getCookie('authToken')){
        this.router.navigate(['/']);
      }else{
        return true;
      }
  }
}
