import { Component, OnInit, inject } from '@angular/core';
import { FiltroPacientesComponent } from '../../../componentes/filtro-pacientes.componente/filtro.pacientes.componente/filtro.pacientes.componente';
import { PacienteService } from '../../../servicios/paciente.serv/paciente.serv'; 
import { Paciente } from '../../../interfaces/paciente/paciente'; 

@Component({
  selector: 'app-pagina-indice-pacientes',
  standalone: true, 
  imports: [FiltroPacientesComponent],
  templateUrl: './pagina-indice-pacientes.componente.html'
})
export class PaginaIndicePacientesComponente implements OnInit {
  private _pacienteServ = inject(PacienteService);

  pacientesOriginales: Paciente[] = []; 
  pacientesFiltrados: Paciente[] = [];  

  ngOnInit(): void {
    this.pacientesOriginales = this._pacienteServ.getPacientes();
    this.pacientesFiltrados = [...this.pacientesOriginales];
  }

  aplicarFiltros(filtros: any): void {
    this.pacientesFiltrados = this.pacientesOriginales.filter(paciente => {
      const terminoBusqueda = filtros.nombre ? filtros.nombre.toLowerCase() : '';
      const nombreCompleto = `${paciente.nombre} ${paciente.apellidos}`.toLowerCase();
      
      return !terminoBusqueda || nombreCompleto.includes(terminoBusqueda);
    });
  }
}
