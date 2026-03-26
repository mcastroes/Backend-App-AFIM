import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.serv/auth-serv';
import { PacienteService } from '../paciente.serv/paciente.serv'; 
import { PaginaTest, RespuestaCuestionario, ResultadoPrueba } from '../../interfaces/test_paciente/test_paciente';

@Injectable({
  providedIn: 'root'
})
export class TestRunnerService {
  
  private router = inject(Router);
  private authService = inject(AuthService);
  private pacienteService = inject(PacienteService);

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
      id: 'pag_3',
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

  public readonly indicePagina = signal<number>(0);
  public readonly respuestasUsuario = signal<RespuestaCuestionario[]>([]);

  public readonly paginaActual = computed(() => this.paginas()[this.indicePagina()]);
  public readonly progreso = computed(() => `${this.indicePagina() + 1}/${this.paginas().length}`);
  public readonly esUltimaPagina = computed(() => this.indicePagina() === this.paginas().length - 1);

  public guardarRespuesta(idPregunta: string, valor: any): void {
    this.respuestasUsuario.update(respuestas => {
      const index = respuestas.findIndex(r => r.idPregunta === idPregunta);
      if (index > -1) {
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[index] = { idPregunta, valor };
        return nuevasRespuestas;
      }
      return [...respuestas, { idPregunta, valor }];
    });
  }

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

  public avanzar(): void {
    if (!this.esUltimaPagina()) {
      this.indicePagina.update(i => i + 1);
    } else {
      this.finalizarPrueba();
    }
  }

  public retroceder(): void {
    if (this.indicePagina() > 0) {
      this.indicePagina.update(i => i - 1);
    }
  }

  public finalizarPrueba(): void {
    const idUsuario = this.authService.obtenerIdPacienteActual();
    
    const resultadoFinal: ResultadoPrueba = {
      fechaFinalizacion: new Date().toISOString(),
      respuestas: [...this.respuestasUsuario()]
    };

    if (idUsuario) {
      this.pacienteService.agregarResultadoPrueba(idUsuario, resultadoFinal);
    }

    console.log('Resultado Final Estructurado:', JSON.stringify(resultadoFinal, null, 2));

    this.indicePagina.set(0);
    this.respuestasUsuario.set([]);
    this.router.navigate(['usuario/pagina-principal-usuario']);
  }
}