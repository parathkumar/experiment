// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// //import { JwtHelperService } from '@auth0/angular-jwt';
// import { Observable } from 'rxjs';

import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@core/services";
import { filter, map, take, tap } from "rxjs";

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   // constructor(private jwtHelper: JwtHelperService, private router: Router) {
//   // }
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       // const token = localStorage.getItem("jwt");
//       // if(token && !this.jwtHelper.isTokenExpired(token))
//       // {
//       //   if(state.url == '/auth/login'){
//       //     return this.router.parseUrl('/dashboard')
//       //   }
//       //   return true;
//       // }
//       // else{
//       //   if(state.url == '/auth/login'){
//       //     return true;
//       //   }
//       //   return this.router.parseUrl('auth/login')
//       // }
//       return true;
//   }

// }

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).session$.pipe(
    filter((ses) => !!ses),
    take(1),
    map((res) => (res?.user ? true : router.parseUrl("login"))),
    tap(res=>console.log('in guard',res))
  );
};
