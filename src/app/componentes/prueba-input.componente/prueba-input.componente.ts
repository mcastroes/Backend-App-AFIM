import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prueba-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input 
      type="text" 
      [(ngModel)]="valor"
      (blur)="emitirRespuesta()"
      class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
      placeholder="Escribe tu respuesta aquí..."
    >
  `
})
export class PruebaInputComponent {
  public valor = '';
  public respuesta = output<string>();

  public emitirRespuesta(): void {
    this.respuesta.emit(this.valor);
  }
}