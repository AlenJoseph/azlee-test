import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  setCookie(name, value, expire=180) {
    let dateTime = new Date();
    dateTime.setTime(dateTime.getTime() + (expire*24*60*60*1000));
    let expires = "expires="+ dateTime.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  getCookie(cname) {
    let name:string = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
