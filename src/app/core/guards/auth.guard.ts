// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(public authService: AuthenticationService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    console.log(this.authService.isLoggedIn);
    if (this.authService.isLoggedIn !== true) {
      window.alert('Access Denied, Login is required!');
      this.router.navigate(['login']);
    }
    return true;
  }
}