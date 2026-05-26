import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prueba-input',
  standalone: true, // Componente independiente (sin necesidad de NgModules)
  imports: [FormsModule], // Importamos FormsModule para habilitar el uso de ngModel
  template: `
    <input 
      type="text" 
      [(ngModel)]="valor" 
      (blur)="emitirRespuesta()"
      class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
      placeholder="Escribe tu respuesta aquí..."
    >
    <!-- [(ngModel)]: Enlace bidireccional. Lo que se escribe en el HTML se guarda en la variable 'valor' del TS al instante. -->
    <!-- (blur): Evento que se dispara cuando el usuario hace clic fuera del campo o salta al siguiente (pierde el foco). -->
  `
})
export class PruebaInputComponent {
  // Variable que almacena el texto introducido por el usuario
  public valor = '';

  // Nueva sintaxis de Angular para emitir datos al componente padre.
  // Es más limpia y eficiente que el antiguo @Output con EventEmitter.
  public respuesta = output<string>();

  /**
   * Envía el valor actual al componente padre.
   * Lo lanzamos en el 'blur' para asegurar que enviamos la respuesta 
   * completa y no cada letra por separado mientras escribe.
   */
  public emitirRespuesta(): void {
    this.respuesta.emit(this.valor);
  }
}
