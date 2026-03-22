import { Component, input, output } from '@angular/core';
import { Cita } from '../../../interfaces/cita/cita';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.componente.html'
})
export class CitasComponent {
  citas = input<Cita[]>([]);
  estadoCambiado = output<{id: number, nuevoEstado: string}>();

  actualizarEstado(id: number, nuevoEstado: string): void {
    this.estadoCambiado.emit({ id, nuevoEstado });
  }
}