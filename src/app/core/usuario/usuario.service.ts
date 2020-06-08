import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) { }

  estaLogado() {
    return this.authService.estaLogado();
  }

  logout() {
    this.afAuth.auth.signOut()
  }

  async logar(email: string, password: string) {
    try {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    } catch(err) {
      console.log(err)
    }
  }

  get usuario$() {
    return this.afAuth.authState;
  }
}
