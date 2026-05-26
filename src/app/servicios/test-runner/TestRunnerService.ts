import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.serv/auth-serv';
import { PacienteService } from '../paciente.serv/paciente.serv'; 
import { PaginaTest, RespuestaCuestionario, ResultadoPrueba } from '../../interfaces/test_paciente/test_paciente';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root' // PATRÓN SINGLETON: Angular garantiza una única instancia compartida en toda la app.
})
export class TestRunnerService {
  
  // INYECCIÓN DE DEPENDENCIAS: Forma moderna con inject() en lugar de constructor.
  private router = inject(Router);
  private authService = inject(AuthService);
  private pacienteService = inject(PacienteService);

  // CONFIGURACIÓN REACTIVA: Definimos la batería de pruebas como un Signal privado.
  // Al ser un array de objetos (PaginaTest), permite añadir pruebas nuevas fácilmente (escalabilidad).
  private readonly paginas = signal<PaginaTest[]>([
    {
      id: 'pag_1',
      preguntas: [
        { id: 't_1', tipo: 'texto', titulo: '¿En qué año estamos?' },
        { id: 't_2', tipo: 'texto', titulo: '¿En qué mes estamos?' },
        { id: 't_3', tipo: 'texto', titulo: '¿Qué día de la semana es hoy?' }
      ]
    },
    {
      id: 'pag_3', // Nota: El ID no tiene por qué ser correlativo, lo que da flexibilidad.
      preguntas: [
        { id: 'd_1', tipo: 'dibujo', titulo: 'Dibuja un reloj que marque las 11:10' }
      ]
    },
    {
      id: 'pag_4',
      preguntas: [
        { 
          id: 'a_1', 
          tipo: 'audio', 
          titulo: 'Si te digo animales... ¿qué te viene a la mente?', 
          tiempoMaximo: 60
        }
      ]
    }
  ]);

  // ESTADOS DEL TEST:
  public readonly indicePagina = signal<number>(0); // Controla en qué página está el paciente.
  public readonly respuestasUsuario = signal<RespuestaCuestionario[]>([]); // Buffer temporal de respuestas.

  // VALORES CALCULADOS (COMPUTED): Se actualizan automáticamente solo cuando cambia el Signal de origen.
  // Esto optimiza el rendimiento al evitar cálculos manuales en cada cambio de vista.
  public readonly paginaActual = computed(() => this.paginas()[this.indicePagina()]);
  public readonly progreso = computed(() => `${this.indicePagina() + 1}/${this.paginas().length}`);
  public readonly esUltimaPagina = computed(() => this.indicePagina() === this.paginas().length - 1);

  /**
   * GUARDADO REACTIVO: Actualiza el estado de las respuestas.
   * Aplica INMUTABILIDAD: No modifica el array original, sino que crea uno nuevo con el cambio.
   */
  public guardarRespuesta(idPregunta: string, valor: any): void {
    this.respuestasUsuario.update(respuestas => {
      const index = respuestas.findIndex(r => r.idPregunta === idPregunta);
      if (index > -1) {
        // Clonamos el array y actualizamos el índice específico (Inmutabilidad).
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[index] = { idPregunta, valor };
        return nuevasRespuestas;
      }
      // Si la respuesta no existía, añadimos la nueva entrada al array.
      return [...respuestas, { idPregunta, valor }];
    });
  }

  // MÉTODOS DE UTILIDAD: Facilitan la comunicación desde los componentes hijos.
  public guardarPreguntas(preguntas: any[]): void {
    preguntas.forEach(p => {
      this.guardarRespuesta(p.id, p.respuestaUsuario || p.respuesta);
    });
  }

  public guardarDibujo(imagenBase64: string): void {
    this.guardarRespuesta('dibujo_final', imagenBase64);
  }

  public obtenerTodo(): RespuestaCuestionario[] {
    return this.respuestasUsuario();
  }

  // NAVEGACIÓN INTERNA:
  public avanzar(): void {
    if (!this.esUltimaPagina()) {
      this.indicePagina.update(i => i + 1);
    } else {
      this.finalizarPrueba(); // Al llegar al final, procedemos al cierre.
    }
  }

  public retroceder(): void {
    if (this.indicePagina() > 0) {
      this.indicePagina.update(i => i - 1);
    }
  }

  /**
   * CIERRE DE PRUEBA:
   * 1. Recupera el ID del paciente del AuthService.
   * 2. Empaqueta el ResultadoPrueba.
   * 3. Envía el resultado al PacienteService para su persistencia.
   * 4. Limpia el estado (Reset) y redirige al panel principal.
   */
  public finalizarPrueba(): void {
  const idUsuario = this.authService.obtenerIdPacienteActual();

  const resultadoFinal: ResultadoPrueba = {
    fechaFinalizacion: new Date().toISOString(),
    respuestas: [...this.respuestasUsuario()]
  };

  const resetYNavegar = () => {
    this.indicePagina.set(0);
    this.respuestasUsuario.set([]);
    this.router.navigate(['usuario/pagina-principal-usuario']);
  };

  if (idUsuario) {
    this.pacienteService.agregarResultadoPrueba(idUsuario, resultadoFinal).subscribe({
      next: () => resetYNavegar(),
      error: () => resetYNavegar()
    });
  } else {
    resetYNavegar();
  }
}
}
