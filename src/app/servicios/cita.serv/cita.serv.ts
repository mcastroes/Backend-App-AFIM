import { Injectable, inject } from '@angular/core';
import { Cita, CitaVista} from '../../interfaces/cita/cita';
import { PacienteService } from '../paciente.serv/paciente.serv';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private pacienteServ = inject(PacienteService);

  private citasDB: Cita[] = [
    { id: 1, fecha: '2025-12-01', dia: 1, hora: '09:00', paciente: this.pacienteServ.getPacientePorId(101)! },
    { id: 2, fecha: '2025-12-01', dia: 1, hora: '11:30', paciente: this.pacienteServ.getPacientePorId(102)! },
    { id: 3, fecha: '2025-12-12', dia: 12, hora: '16:00', paciente: this.pacienteServ.getPacientePorId(103)! },
    { id: 4, fecha: '2025-12-12', dia: 12, hora: '17:00', paciente: this.pacienteServ.getPacientePorId(104)! }
  ];

  getCitasVistaPorDia(dia: number): CitaVista[] {
    return this.citasDB
      .filter(cita => cita.dia === dia)
      .map(cita => ({
        id: cita.id,
        hora: cita.hora,
        nombrePaciente: `${cita.paciente.nombre} ${cita.paciente.apellidos}`
      }))
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }

  tieneCitas(dia: number): boolean {
    return this.citasDB.some(cita => cita.dia === dia);
  }

  agregarCita(dia: number, hora: string, id_paciente: number): void {
    const pacienteObj = this.pacienteServ.getPacientePorId(id_paciente);
    if (!pacienteObj) return; 

    const nuevoId = this.citasDB.length > 0 ? Math.max(...this.citasDB.map(c => c.id)) + 1 : 1;
    const diaString = dia.toString().padStart(2, '0');
    
    this.citasDB.push({
      id: nuevoId,
      fecha: `2025-12-${diaString}`,
      dia: dia,
      hora: hora,
      paciente: pacienteObj
    });
  }
}
