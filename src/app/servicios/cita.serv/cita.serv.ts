import { Injectable } from '@angular/core';
import { Cita, CitaVista, Paciente } from '../../interfaces/cita/cita';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private pacientesDB: Paciente[] = [
    { id: 101, nombre: 'María', apellidos: 'López' },
    { id: 102, nombre: 'Juan', apellidos: 'Pérez' },
    { id: 103, nombre: 'Ana', apellidos: 'García' },
    { id: 104, nombre: 'Luis', apellidos: 'Miguel' }
  ];

  private citasDB: Cita[] = [
    { id: 1, fecha: '2025-12-01', dia: 1, hora: '09:00', id_paciente: 101 },
    { id: 2, fecha: '2025-12-01', dia: 1, hora: '11:30', id_paciente: 102 },
    { id: 3, fecha: '2025-12-12', dia: 12, hora: '16:00', id_paciente: 103 },
    { id: 4, fecha: '2025-12-12', dia: 12, hora: '17:00', id_paciente: 104 }
  ];

  getPacientes(): Paciente[] {
    return this.pacientesDB;
  }

  getCitasVistaPorDia(dia: number): CitaVista[] {
    return this.citasDB
      .filter(cita => cita.dia === dia)
      .map(cita => {
        const paciente = this.pacientesDB.find(p => p.id === cita.id_paciente);      
        return {
          id: cita.id,
          hora: cita.hora,
          nombrePaciente: paciente ? `${paciente.nombre} ${paciente.apellidos}` : 'Paciente Desconocido'
        };
      })
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }

  tieneCitas(dia: number): boolean {
    return this.citasDB.some(cita => cita.dia === dia);
  }

  agregarCita(dia: number, hora: string, id_paciente: number): void {
    const nuevoId = this.citasDB.length > 0 ? Math.max(...this.citasDB.map(c => c.id)) + 1 : 1;
    const diaString = dia.toString().padStart(2, '0');
    
    this.citasDB.push({
      id: nuevoId,
      fecha: `2025-12-${diaString}`,
      dia: dia,
      hora: hora,
      id_paciente: id_paciente
    });
  }
}
