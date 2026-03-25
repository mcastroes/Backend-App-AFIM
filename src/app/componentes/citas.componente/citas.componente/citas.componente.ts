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

  obtenerNombreMes(num: number): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[num - 1] || '---';
  }

  actualizarEstado(id: number, nuevoEstado: 'completada' | 'cancelada'): void {
    this.estadoCambiado.emit({ id, nuevoEstado });
  }
}