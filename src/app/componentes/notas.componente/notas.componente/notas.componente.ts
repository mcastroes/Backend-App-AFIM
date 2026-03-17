import { Component, input, output } from '@angular/core';
import { Nota } from '../../../interfaces/paciente/paciente';

@Component({
  selector: 'app-notas',
  standalone: true,
  templateUrl: './notas.componente.html'
})
export class NotasComponent {
  notas = input<Nota[]>([]);
  nuevaNota = output<void>();

  onAgregarNota(): void {
    this.nuevaNota.emit();
  }
}
