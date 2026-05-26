import { Component, input, output } from '@angular/core';
import { Paciente } from '../../../interfaces/paciente/paciente';

@Component({
  selector: 'app-lista-pacientes',
  standalone: true,
  templateUrl: './lista-pacientes.componente.html'
})
export class ListaPacientesComponent {
  pacientes = input.required<Paciente[]>();
  
  seleccionarPaciente = output<Paciente>();

  onSeleccionar(paciente: Paciente): void {
    this.seleccionarPaciente.emit(paciente);
  }
}
