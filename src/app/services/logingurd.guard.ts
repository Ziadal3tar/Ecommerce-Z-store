import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LogingurdGuard implements CanActivate {
  constructor(
    private UserService:UserService,
    private Router:Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.length > 0) {
      // this.UserService.saveData(localStorage.getItem("userToken"))

      return true;
    }
    this.Router.navigate(['login']);
    return false;
  }
}
