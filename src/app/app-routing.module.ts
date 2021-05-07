import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { ListadoComponent } from './paginas/listado/listado.component';
import { AdminComponent } from './paginas/admin/admin.component';
import { BienvenidaComponent } from './paginas/bienvenida/bienvenida.component';
import { IsLogueadoGuard } from './guard/isLogueado/is-logueado.guard';

const routes: Routes = [

  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'registro',
    component:ListadoComponent
  },
  {
    path:'admin',
    component:AdminComponent,
    canActivate:[IsLogueadoGuard]
  },
  {
    path:'bienvenida',
    component:BienvenidaComponent
  },

  {
    //Si intenta entrar en cualquier otra pagina
    path: '',
    redirectTo:'registro',
    pathMatch:'full'
  },
  {
    //Lo mismo pero por si se equivoca, etc
    path:'**',
    redirectTo:'registro',
    pathMatch:'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
