import { Injectable } from '@angular/core';
import { Nota, Paciente } from '../../interfaces/paciente/paciente';
import { Cita } from '../../interfaces/cita/cita';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private pacientesDB: Paciente[] = [
    { id: 101, nombre: 'Paciente', apellidos: '1', riesgo: 'bajo', discapacidad: 'intelectual', en_seguimiento: true, citas: [], notas: [] },
    { id: 102, nombre: 'Paciente', apellidos: '2', riesgo: 'medio', discapacidad: 'intelectual', en_seguimiento: false, citas: [], notas: [] },
    { id: 103, nombre: 'Paciente', apellidos: '3', riesgo: 'alto', discapacidad: 'fisica', en_seguimiento: true, citas: [], notas: [] },
    { id: 104, nombre: 'Paciente', apellidos: '4', riesgo: 'bajo', discapacidad: 'sensorial', en_seguimiento: false, citas: [], notas: [] }
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
      citas: [], 
      notas: []
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

  getNotas(pacienteId: number): Nota[] {
    const paciente = this.getPacientePorId(pacienteId);
    return paciente && paciente.notas ? [...paciente.notas] : [];
  }

  getNotaById(pacienteId: number, notaId: number): Nota | undefined {
    const notas = this.getNotas(pacienteId);
    const nota = notas.find(n => n.id === notaId);
    return nota ? { ...nota } : undefined;
  }

  agregarNota(pacienteId: number, contenido: string): void {
    const paciente = this.getPacientePorId(pacienteId);
    if (paciente) {
      if (!paciente.notas) paciente.notas = [];
      
      const maxNotaId = paciente.notas.length > 0 
        ? Math.max(...paciente.notas.map(n => n.id)) 
        : 0;

      const nuevaNota: Nota = {
        id: maxNotaId + 1,
        contenido: contenido
      };

      paciente.notas.push(nuevaNota);
    }
  }

  actualizarNota(pacienteId: number, notaId: number, nuevoContenido: string): void {
    const paciente = this.getPacientePorId(pacienteId);
    if (paciente && paciente.notas) {
      const index = paciente.notas.findIndex(n => n.id === notaId);
      if (index !== -1) {
        paciente.notas[index].contenido = nuevoContenido;
      }
    }
  }

  eliminarNota(pacienteId: number, notaId: number): void {
    const paciente = this.getPacientePorId(pacienteId);
    if (paciente && paciente.notas) {
      paciente.notas = paciente.notas.filter(n => n.id !== notaId);
    }
  }
}
