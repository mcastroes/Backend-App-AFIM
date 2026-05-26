import { Cita } from '../cita/cita';
import { ResultadoPrueba } from '../test_paciente/test_paciente';

export interface Paciente {
  id: number;
  nombre: string;
  apellidos: string; 
  riesgo: 'bajo' | 'medio' | 'alto';
  discapacidad: 'fisica' | 'intelectual' | 'sensorial'; 
  en_seguimiento: boolean;
  citas: Cita[];
  notas: Nota[];
  recomendaciones: Recomendacion[];
  resultadosPruebas: ResultadoPrueba[];
}

export interface FiltrosPaciente {
  nombre?: string;
  riesgo?: 'bajo' | 'medio' | 'alto' | string;
  discapacidad?: 'fisica' | 'intelectual' | 'sensorial' | string;
  dia?: string;
  mes?: string;
  anio?: string;
}

export interface Nota {
  id: number;
  contenido: string;
}

export interface Recomendacion {
  id: number;
  titulo: string;
  contenido: string;
}