import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(private router: Router) {}

  isLogin = true;

  ngOnInit(): void {
    if (this.router.url == '/signup') {
      this.isLogin = false;
    }
  }
}
