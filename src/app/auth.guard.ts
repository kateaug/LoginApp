import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { Router } from '@angular/router';
import { UserService } from './user.service'
import { map } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authorizationService: AuthorizationService, 
    private router: Router,
    private userService: UserService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //debugger
      if(this.authorizationService.isLoggedIn) {
        return true
      }
      return this.userService.isLoggedIn().pipe(map(res => {
        if(res.status) {
          this.authorizationService.setLoggedIn(true)
          return true
        } else {
          this.router.navigate(['login'])
          return false
        }
      }))
  }
}