import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FiltroPacientesComponent } from '../../../componentes/filtro-pacientes.componente/filtro.pacientes.componente/filtro.pacientes.componente';
import { ListaPacientesComponent } from '../../../componentes/lista-pacientes.componente/lista-pacientes.componente/lista-pacientes.componente';
import { PacienteService } from '../../../servicios/paciente.serv/paciente.serv'; 
import { Paciente } from '../../../interfaces/paciente/paciente'; 

@Component({
  selector: 'app-pagina-indice-pacientes',
  standalone: true, 
  imports: [FiltroPacientesComponent, ListaPacientesComponent],
  templateUrl: './pagina-indice-pacientes.componente.html'
})
export class PaginaIndicePacientesComponente implements OnInit {
  private _pacienteServ = inject(PacienteService);
  private router = inject(Router);

  pacientesOriginales = signal<Paciente[]>([]);
  filtrosActuales = signal<any>({});

  pacientesFiltrados = computed(() => {
    const pacientes = this.pacientesOriginales();
    const filtros = this.filtrosActuales();
    
    const terminoBusqueda = filtros.nombre ? filtros.nombre.toLowerCase() : '';
    
    return pacientes.filter(paciente => {
      const nombreCompleto = `${paciente.nombre} ${paciente.apellidos}`.toLowerCase();
      return !terminoBusqueda || nombreCompleto.includes(terminoBusqueda);
    });
  });

  ngOnInit(): void {
    this.pacientesOriginales.set(this._pacienteServ.getPacientes());
  }

  aplicarFiltros(filtros: any): void {
    this.filtrosActuales.set(filtros);
  }

  abrirPerfilPaciente(paciente: Paciente): void {
    this.router.navigate(['/paciente', paciente.id]);
  }

  irACrearPaciente(): void {
    this.router.navigate(['/crear-paciente']);
  }
}
