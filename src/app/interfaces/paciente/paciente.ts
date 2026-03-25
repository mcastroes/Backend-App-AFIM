import { Cita } from '../cita/cita';

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