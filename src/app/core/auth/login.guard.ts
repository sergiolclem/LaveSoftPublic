import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.estaLogado().pipe(
      map(result => !result),
      tap(naoLogado => {
        if (!naoLogado) this.router.navigate(['faturamento','relatorio-faturamento'])
      })
    )
  }
  
}
