import { Injectable } from '@angular/core';
import { Paciente } from '../../interfaces/paciente/paciente';
import { Cita } from '../../interfaces/cita/cita';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private pacientesDB: Paciente[] = [
    { id: 101, nombre: 'María', apellidos: 'López', riesgo: 'bajo', discapacidad: 'intelectual', en_seguimiento: true, citas: [] },
    { id: 102, nombre: 'Juan', apellidos: 'Pérez', riesgo: 'medio', discapacidad: 'intelectual', en_seguimiento: false, citas: [] },
    { id: 103, nombre: 'Ana', apellidos: 'García', riesgo: 'alto', discapacidad: 'fisica', en_seguimiento: true, citas: [] },
    { id: 104, nombre: 'Luis', apellidos: 'Miguel', riesgo: 'bajo', discapacidad: 'sensorial', en_seguimiento: false, citas: [] }
  ];

  getPacientes(): Paciente[] {
    return [...this.pacientesDB];
  }

  getPacientePorId(id: number): Paciente | undefined {
    return this.pacientesDB.find(paciente => paciente.id === id);
  }

  agregarPaciente(nuevoPaciente: any): void {
    const maxId = this.pacientesDB.length > 0 
      ? Math.max(...this.pacientesDB.map(p => p.id)) 
      : 100;
      
    const pacienteFinal: Paciente = {
      id: maxId + 1,
      nombre: nuevoPaciente.nombre,
      apellidos: nuevoPaciente.apellidos,
      riesgo: nuevoPaciente.riesgo,
      discapacidad: nuevoPaciente.discapacidad,
      en_seguimiento: nuevoPaciente.en_seguimiento ?? true,
      citas: []
    };

    this.pacientesDB.push(pacienteFinal);
  }

  actualizarPaciente(id: number, datosActualizados: Partial<Paciente>): void {
    const index = this.pacientesDB.findIndex(paciente => paciente.id === id);
    if (index !== -1) {
      this.pacientesDB[index] = { ...this.pacientesDB[index], ...datosActualizados };
    }
  }

  eliminarPaciente(id: number): void {
    this.pacientesDB = this.pacientesDB.filter(paciente => paciente.id !== id);
  }

  filtrarPacientes(filtros: { nombre?: string, riesgo?: string, discapacidad?: string, en_seguimiento?: boolean }): Paciente[] {
    return this.pacientesDB.filter(paciente => {
      let coincide = true;

      if (filtros.nombre) {
        const terminoBusqueda = filtros.nombre.toLowerCase();
        const nombreCompleto = `${paciente.nombre} ${paciente.apellidos}`.toLowerCase();
        coincide = coincide && nombreCompleto.includes(terminoBusqueda);
      }

      if (filtros.riesgo) {
        coincide = coincide && paciente.riesgo === filtros.riesgo;
      }

      if (filtros.discapacidad) {
        coincide = coincide && paciente.discapacidad === filtros.discapacidad;
      }

      if (filtros.en_seguimiento !== undefined) {
        coincide = coincide && paciente.en_seguimiento === filtros.en_seguimiento;
      }

      return coincide;
    });
  }

  getCitas(pacienteId: number): Cita[] {
    const paciente = this.getPacientePorId(pacienteId);
    return paciente ? [...paciente.citas] : [];
  }

  getCitaPorId(pacienteId: number, citaId: number): Cita | undefined {
    const paciente = this.getPacientePorId(pacienteId);
    return paciente?.citas.find(cita => cita.id === citaId);
  }

  agregarCita(pacienteId: number, nuevaCita: any): void {
    const paciente = this.getPacientePorId(pacienteId);
    if (paciente) {
      const maxCitaId = paciente.citas.length > 0 
        ? Math.max(...paciente.citas.map(c => c.id)) 
        : 0;
      
      const citaFinal = {
        ...nuevaCita,
        id: maxCitaId + 1
      };
      
      paciente.citas.push(citaFinal);
    }
  }

  actualizarCita(pacienteId: number, citaId: number, datosActualizados: Partial<Cita>): void {
    const paciente = this.getPacientePorId(pacienteId);
    if (paciente) {
      const indexCita = paciente.citas.findIndex(c => c.id === citaId);
      if (indexCita !== -1) {
        paciente.citas[indexCita] = { ...paciente.citas[indexCita], ...datosActualizados };
      }
    }
  }

  eliminarCita(pacienteId: number, citaId: number): void {
    const paciente = this.getPacientePorId(pacienteId);
    if (paciente) {
      paciente.citas = paciente.citas.filter(cita => cita.id !== citaId);
    }
  }
}
