export interface Cita {
  id: number;
  fecha: string;
  dia: number;
  hora: string;
  estado: 'pendiente' | 'completada' | 'cancelada';
}

export interface CitaVista {
  id: number;
  hora: string;
  nombrePaciente: string;
}
