import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.user$ = this.afAuth.authState;
  }

  estaLogado() {
    return this.user$.pipe(
      take(1),
      map(user => !!user)
    )
  }
}
