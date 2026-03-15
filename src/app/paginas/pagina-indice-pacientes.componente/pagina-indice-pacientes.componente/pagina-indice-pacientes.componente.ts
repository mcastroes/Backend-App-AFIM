import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FiltroPacientesComponent } from '../../../componentes/filtro-pacientes.componente/filtro.pacientes.componente/filtro.pacientes.componente';
import { ListaPacientesComponent } from '../../../componentes/lista-pacientes.componente/lista-pacientes.componente/lista-pacientes.componente';
import { CrearPacienteComponent } from '../../../componentes/crear-paciente.componente/crear-paciente.componente/crear-paciente.componente';
import { PacienteService } from '../../../servicios/paciente.serv/paciente.serv'; 
import { Paciente } from '../../../interfaces/paciente/paciente'; 

@Component({
  selector: 'app-pagina-indice-pacientes',
  standalone: true, 
  imports: [FiltroPacientesComponent, ListaPacientesComponent, CrearPacienteComponent],
  templateUrl: './pagina-indice-pacientes.componente.html'
})
export class PaginaIndicePacientesComponente implements OnInit {
  private _pacienteServ = inject(PacienteService);
  private router = inject(Router);

  pacientesOriginales = signal<Paciente[]>([]);
  filtrosActuales = signal<any>({});
  mostrarModal = signal<boolean>(false);

  pacientesFiltrados = computed(() => {
    const pacientes = this.pacientesOriginales();
    const filtros = this.filtrosActuales();
    
    return pacientes.filter(paciente => {
      let coincide = true;

      if (filtros.nombre) {
        const terminoBusqueda = filtros.nombre.toLowerCase();
        const nombreCompleto = `${paciente.nombre} ${paciente.apellidos}`.toLowerCase();
        coincide = coincide && nombreCompleto.includes(terminoBusqueda);
      }

      if (filtros.riesgo) {
        coincide = coincide && paciente.riesgo === filtros.riesgo;
      }

      if (filtros.discapacidad) {
        coincide = coincide && paciente.discapacidad === filtros.discapacidad;
      }

      return coincide;
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

  abrirModalCreacion(): void {
    this.mostrarModal.set(true);
  }

  cerrarModal(): void {
    this.mostrarModal.set(false);
  }

  guardarNuevoPaciente(datos: any): void {
    this._pacienteServ.agregarPaciente(datos);
    this.pacientesOriginales.set(this._pacienteServ.getPacientes());
    this.cerrarModal();
  }
}
