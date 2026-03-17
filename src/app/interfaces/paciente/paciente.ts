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
}

export interface Nota {
  id: number;
  contenido: string;
}