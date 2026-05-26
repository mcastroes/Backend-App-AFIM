import { Routes } from '@angular/router';
import { PaginaLoginComponent } from './paginas/pagina-login.componente/pagina-login.componente';
import { PaginaPrincipalAdministradorComponent } from './paginas/pagina-principal-administrador.componente/pagina-principal-administrador.componente';
import { PaginaIndicePacientesComponente } from './paginas/pagina-indice-pacientes.componente/pagina-indice-pacientes.componente/pagina-indice-pacientes.componente';
import { PaginaDetallePacienteComponent } from './paginas/pagina-detalle-paciente.componente/pagina-detalle-paciente.componente/pagina-detalle-paciente.componente';
import { PaginaDatosPacienteComponent } from './paginas/pagina-datos-paciente.componente/pagina-datos-paciente.componente/pagina-datos-paciente.componente';
import { PaginaRecomendacionesComponent } from './paginas/pagina-recomendaciones.componente/pagina-recomendaciones.componente/pagina-recomendaciones.componente';
import { PaginaResultadosPruebasComponent } from './paginas/pagina-resultados-pruebas.componente/pagina-resultados-pruebas.componente'; 
import { PaginaPrincipalUsuarioComponent } from './paginas/pagina-principal-usuario.componente/pagina-principal-usuario.componente';
import { SeleccionPruebaComponent } from './paginas/pagina-seleccion-prueba.componente/pagina-seleccion-prueba.componente/pagina-seleccion-prueba.componente';
import { RecordatorioComponent } from './paginas/pagina-recordatorio.componente/pagina-recordatorio.componente/pagina-recordatorio.componente';

export const routes: Routes = [
  { path: '', component: PaginaLoginComponent },
  { 
    path: 'admin', 
    children: [
      { path: 'pagina-principal', component: PaginaPrincipalAdministradorComponent },
      { path: 'pagina-indice-pacientes', component: PaginaIndicePacientesComponente },
      { path: 'pagina-detalle-paciente/:id', component: PaginaDetallePacienteComponent },
      { path: 'pagina-datos-paciente/:id', component: PaginaDatosPacienteComponent },
      { path: 'pagina-recomendaciones/:id', component: PaginaRecomendacionesComponent },
      { path: 'pagina-resultados-pruebas/:id', component: PaginaResultadosPruebasComponent },
      { path: '', redirectTo: 'pagina-principal', pathMatch: 'full' }
    ]
  },
  { 
    path: 'usuario', 
    children: [
      { path: 'pagina-principal-usuario/:id', component: PaginaPrincipalUsuarioComponent },
      { path: 'pagina-seleccion-prueba/:id', component: SeleccionPruebaComponent },
      { path: 'pagina-recordatorio', component: RecordatorioComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
