import { Component } from '@angular/core';
import { Location } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-recordatorio',
  templateUrl: './pagina-recordatorio.componente.html'
})
export class RecordatorioComponent {

  constructor(
    private location: Location,
    private router: Router
  ) {}

  
  volver() {
    this.location.back(); 
  }
  
  reproducirAudio(texto: string) {
    
    if ('speechSynthesis' in window) {
      const mensaje = new SpeechSynthesisUtterance(texto);
      mensaje.lang = 'es-ES'; 
      window.speechSynthesis.speak(mensaje);
    } else {
      console.warn('Tu navegador no soporta la lectura de texto por voz.');
      
    }
  }
  
  empezar() {  
    this.router.navigate(['/cuestionario-1']); 
  }

}