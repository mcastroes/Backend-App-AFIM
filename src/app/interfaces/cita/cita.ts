export interface Paciente {
  id: number;
  nombre: string;
  apellidos: string;
}

export interface Cita {
  id: number;
  fecha: string;
  dia: number;
  hora: string;
  id_paciente: number;
}

export interface CitaVista {
  id: number;
  hora: string;
  nombrePaciente: string;
}
