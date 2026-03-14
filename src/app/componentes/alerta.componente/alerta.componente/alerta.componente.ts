import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alerta',
  standalone: true,
  templateUrl: './alerta.componente.html',
  styleUrl: './alerta.componente.css'
})
export class AlertaComponent {
  nombrePaciente = input<string>('Fulanito');
  
  cerrar = output<void>();
  irAlPaciente = output<string>();

  onCerrar() {
    this.cerrar.emit();
  }

  onIrAlPaciente() {
    this.irAlPaciente.emit(this.nombrePaciente());
  }
}