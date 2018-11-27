import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    status: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.route.navigate(['/login']);
    }
  }

  canLoad(route: Route): boolean {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.route.navigate(['/login']);
    }
  }
}
