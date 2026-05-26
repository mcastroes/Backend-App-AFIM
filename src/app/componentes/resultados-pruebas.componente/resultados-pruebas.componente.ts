import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoPrueba } from '../../interfaces/test_paciente/test_paciente';

@Component({
  selector: 'app-resultados-pruebas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados-pruebas.componente.html'
})
export class ResultadosPruebasComponent {
  @Input({ required: true }) resultado!: ResultadoPrueba; 

  esImagen(valor: any): boolean {
    return typeof valor === 'string' && valor.startsWith('data:image');
  }

  formatearPregunta(texto: string): string {
    if (!texto) return '';
    return texto.replace(/_/g, ' ');
  }
}
