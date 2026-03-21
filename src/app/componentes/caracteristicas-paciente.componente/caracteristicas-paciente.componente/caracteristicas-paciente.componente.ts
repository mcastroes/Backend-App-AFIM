import { Component, input } from '@angular/core';
import { Paciente } from '../../../interfaces/paciente/paciente';

@Component({
  selector: 'app-caracteristicas-paciente',
  standalone: true,
  templateUrl: './caracteristicas-paciente.componente.html'
})
export class CaracteristicasPacienteComponent {
  paciente = input.required<Paciente>();
}