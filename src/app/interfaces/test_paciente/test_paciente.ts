export interface PreguntaTest {
  id: string;
  tipo: 'imagen' | 'texto' | 'dibujo' | 'audio' | 'opciones';
  titulo: string;
  urlMedia?: string;
  opciones?: string[];
  preguntasTexto?: string[];
  tiempoMaximo?: number;
}

export interface PaginaTest {
  id: string;
  preguntas: PreguntaTest[];
}

export interface RespuestaCuestionario {
  idPregunta: string;
  valor: any;
}

export interface ResultadoPrueba {
  fechaFinalizacion: string;
  respuestas: RespuestaCuestionario[];
}