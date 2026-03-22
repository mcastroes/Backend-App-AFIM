import { Routes } from '@angular/router';
import { PaginaLoginComponent } from './paginas/pagina-login.componente/pagina-login.componente';
import { PaginaPrincipalAdministradorComponent } from './paginas/pagina-principal-administrador.componente/pagina-principal-administrador.componente';
import { PaginaPrincipalUsuarioComponente } from './paginas/pagina-principal-usuario.componente/pagina-principal-usuario.componente';
import { PaginaIndicePacientesComponente } from './paginas/pagina-indice-pacientes.componente/pagina-indice-pacientes.componente/pagina-indice-pacientes.componente';
import { PaginaDetallePacienteComponent } from './paginas/pagina-detalle-paciente.componente/pagina-detalle-paciente.componente/pagina-detalle-paciente.componente';
import { PaginaDatosPacienteComponent } from './paginas/pagina-datos-paciente.componente/pagina-datos-paciente.componente/pagina-datos-paciente.componente';
import { PaginaRecomendacionesComponent } from './paginas/pagina-recomendaciones.componente/pagina-recomendaciones.componente/pagina-recomendaciones.componente';

export const routes: Routes = [
  { path: '', component: PaginaLoginComponent },

  { path: 'admin/pagina-principal', component: PaginaPrincipalAdministradorComponent },
  { path: 'admin/pagina-indice-pacientes', component: PaginaIndicePacientesComponente },
  { path: 'admin/pagina-detalle-paciente/:id', component: PaginaDetallePacienteComponent },
  { path: 'admin/pagina-datos-paciente/:id', component: PaginaDatosPacienteComponent },
  { path: 'admin/pagina-recomendaciones/:id', component: PaginaRecomendacionesComponent },

  { path: 'usuario/pagina-principal-usuario', component: PaginaPrincipalUsuarioComponente },
  
  { path: '**', redirectTo: '' }
];
