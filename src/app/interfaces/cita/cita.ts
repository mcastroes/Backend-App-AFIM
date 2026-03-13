import { Paciente } from '../paciente/paciente';

export interface Cita {
  id: number;
  fecha: string;
  dia: number;
  hora: string;
  paciente: Paciente;
}

export interface CitaVista {
  id: number;
  hora: string;
  nombrePaciente: string;
}
