import { Component } from '@angular/core';
import { Location } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-recordatorio',
  templateUrl: './pagina-recordatorio.componente.html'
})
export class RecordatorioComponent {

  constructor(
    // Servicio nativo de Angular para interactuar con el historial del navegador
    private location: Location,
    private router: Router
  ) {}

  /**
   * Navegación hacia atrás.
   * Utiliza el historial del navegador para devolver al usuario a la pantalla anterior.
   */
  volver() {
    this.location.back(); 
  }
  
  /**
   * ACCESIBILIDAD: Síntesis de voz (Text-to-Speech).
   * Lee en voz alta el texto proporcionado para ayudar a pacientes con baja visión
   * o dificultades de lectura.
   */
  reproducirAudio(texto: string) {
    // Comprobamos si la API de síntesis de voz está disponible en el navegador del paciente
    if ('speechSynthesis' in window) {
      const mensaje = new SpeechSynthesisUtterance(texto);
      mensaje.lang = 'es-ES'; // Configuramos el idioma en castellano
      window.speechSynthesis.speak(mensaje); // Ejecuta la lectura
    } else {
      console.warn('Tu navegador no soporta la lectura de texto por voz.');
    }
  }
  
  /**
   * Inicia la secuencia de evaluación.
   * Navega hacia el primer bloque del cuestionario.
   */
  empezar() {  
    this.router.navigate(['/cuestionario-1']); 
  }
}
