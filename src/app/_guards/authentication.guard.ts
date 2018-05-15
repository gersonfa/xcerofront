import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate() {
    const token = localStorage.getItem('token')

    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
