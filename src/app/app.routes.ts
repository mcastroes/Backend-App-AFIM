import { Routes } from '@angular/router';
import { LoginPageComponent } from './paginas/pagina-login.componente/pagina-login.componente';
import { PaginaPrincipalAdministradorComponent } from './paginas/pagina-principal-administrador.componente/pagina-principal-administrador.componente';
import { PaginaPrincipalUsuarioComponente } from './paginas/pagina-principal-usuario.componente/pagina-principal-usuario.componente';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'pagina-principal', component: PaginaPrincipalAdministradorComponent },
  { path: 'pagina-principal-usuario', component: PaginaPrincipalUsuarioComponente },
  
  { path: '**', redirectTo: '' }
];
