import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  
  private servicioDatos = inject(TestRunnerService);
  private router = inject(Router);

  public pasoActual = 1;

  public listaPreguntas = [
    { id: '1', texto: '¿En qué año estamos?', respuestaUsuario: '' },
    { id: '2', texto: '¿En qué estación del año estamos?', respuestaUsuario: '' },
    { id: '3', texto: '¿En qué mes estamos?', respuestaUsuario: '' }
  ];

  public siguientePagina(): void {
    if (this.pasoActual === 1) {
      this.servicioDatos.guardarPreguntas(this.listaPreguntas);
      this.pasoActual++;
    } 
    else {
      this.servicioDatos.finalizarPrueba();
    }
  }

  public alRecibirDibujo(imagenBase64: string): void {
    this.servicioDatos.guardarDibujo(imagenBase64);
  }

  public reproducirAyuda(): void {
   // const audio = document.querySelector('audio') as HTMLAudioElement;
   // if (audio) audio.play();
  }
}