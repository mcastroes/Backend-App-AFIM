import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Importación de los componentes hijos que este "padre" va a controlar
import { PruebaInputComponent } from '../prueba-input.componente/prueba-input.componente';
import { PruebaDibujoComponent } from '../prueba-dibujo.componente/prueba-dibujo.componente';
import { TestRunnerService } from '../../servicios/test-runner/TestRunnerService'; 

@Component({
  selector: 'app-test-runner',
  standalone: true,
  imports: [
    CommonModule, 
    PruebaInputComponent, 
    PruebaDibujoComponent
  ],
  templateUrl: './test-runner-componente.componente.html'
})
export class TestRunnerComponent {
  
  // Uso de inject() para una inyección de dependencias más limpia y moderna (Angular 16+)
  private servicioDatos = inject(TestRunnerService);
  private router = inject(Router);

  // Variable de estado para controlar en qué pantalla del test estamos
  public pasoActual = 1;

  // Modelo de datos local para la primera fase del test (orientación temporal)
  public listaPreguntas = [
    { id: '1', texto: '¿En qué año estamos?', respuestaUsuario: '' },
    { id: '2', texto: '¿En qué estación del año estamos?', respuestaUsuario: '' },
    { id: '3', texto: '¿En qué mes estamos?', respuestaUsuario: '' }
  ];

  /**
   * Gestiona la navegación lógica del test.
   * Si estamos en el paso 1, guarda las respuestas de texto y avanza.
   * Si estamos en el paso 2, finaliza la prueba completa.
   */
  public siguientePagina(): void {
    if (this.pasoActual === 1) {
      // Delegamos el guardado de datos al servicio especializado
      this.servicioDatos.guardarPreguntas(this.listaPreguntas);
      this.pasoActual++;
    } 
    else {
      // Cerramos el test y procesamos el resultado final
      this.servicioDatos.finalizarPrueba();
    }
  }

  /**
   * Método que actúa como "puente" (callback).
   * Recibe la imagen en Base64 desde el componente hijo (PruebaDibujo)
   * y la envía directamente al servicio para su persistencia.
   */
  public alRecibirDibujo(imagenBase64: string): void {
    this.servicioDatos.guardarDibujo(imagenBase64);
  }

  /**
   * Prototipo de función para accesibilidad.
   * Permite reproducir instrucciones de voz para pacientes con dificultades visuales.
   */
  public reproducirAyuda(): void {
   // const audio = document.querySelector('audio') as HTMLAudioElement;
   // if (audio) audio.play();
  }
}
