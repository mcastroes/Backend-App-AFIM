import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alerta',
  standalone: true,
  templateUrl: './alerta.componente.html',
  styleUrl: './alerta.componente.css'
})
export class AlertaComponent {
  @Input() nombrePaciente: string = 'Fulanito';
  
  @Output() cerrar = new EventEmitter<void>();
  @Output() irAlPaciente = new EventEmitter<string>();

  onCerrar() {
    this.cerrar.emit();
  }

  onIrAlPaciente() {
    this.irAlPaciente.emit(this.nombrePaciente);
  }
}
