import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './core/auth/login.guard';


const routes: Routes = [
  {
    path: 'pi',
    loadChildren: () => import('./pi/pi.module').then(m => m.PiModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'cadastros',
    loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'consultas',
    loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'faturamento',
    loadChildren: () => import('./faturamento/faturamento.module').then(m => m.FaturamentoModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ LoginGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
