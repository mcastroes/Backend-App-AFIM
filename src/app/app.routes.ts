import { Routes } from '@angular/router';
import { PaginaLoginComponent } from './paginas/pagina-login.componente/pagina-login.componente';
import { PaginaPrincipalAdministradorComponent } from './paginas/pagina-principal-administrador.componente/pagina-principal-administrador.componente';
import { PaginaPrincipalUsuarioComponente } from './paginas/pagina-principal-usuario.componente/pagina-principal-usuario.componente';
import { PaginaIndicePacientesComponente } from './paginas/pagina-indice-pacientes.componente/pagina-indice-pacientes.componente/pagina-indice-pacientes.componente';

export const routes: Routes = [
  { path: '', component: PaginaLoginComponent },

  { path: 'admin/pagina-principal', component: PaginaPrincipalAdministradorComponent },
  { path: 'admin/pagina-indice-pacientes', component: PaginaIndicePacientesComponente },

  { path: 'usuario/pagina-principal-usuario', component: PaginaPrincipalUsuarioComponente },

  
  { path: '**', redirectTo: '' }
];
