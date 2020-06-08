import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/core/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public estaLogado: boolean;
  public usuario$: Observable<firebase.User>;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioService.estaLogado().subscribe(bool => {
      this.estaLogado = bool;
    })
    this.usuario$ = this.usuarioService.usuario$;
  }

  sair() {
    this.usuarioService.logout();
    this.router.navigate(['login']);
  }
}
