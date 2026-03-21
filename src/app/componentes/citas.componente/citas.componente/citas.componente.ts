import { Component, input } from '@angular/core';
import { Cita } from '../../../interfaces/cita/cita';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.componente.html'
})
export class CitasComponent {
  citas = input<Cita[]>([]);
}
