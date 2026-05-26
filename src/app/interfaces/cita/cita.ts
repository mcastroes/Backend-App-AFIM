export interface Cita {
  id: number;
  dia: number;
  mes: number;
  anio: number;
  hora: string;
  estado: 'pendiente' | 'completada' | 'cancelada';
}

export interface CitaVista {
  id: number;
  hora: string;
  nombrePaciente: string;
}
