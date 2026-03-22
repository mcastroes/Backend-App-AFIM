import { Injectable } from '@angular/core';
import { Nota, Recomendacion, Paciente } from '../../interfaces/paciente/paciente';
import { Cita } from '../../interfaces/cita/cita';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private pacientesDB: Paciente[] = [
    { id: 101, nombre: 'Paciente', apellidos: '1', riesgo: 'bajo', discapacidad: 'intelectual', en_seguimiento: true, citas: [], notas: [], recomendaciones: [] },
    { id: 102, nombre: 'Paciente', apellidos: '2', riesgo: 'medio', discapacidad: 'intelectual', en_seguimiento: false, citas: [], notas: [], recomendaciones: [] },
    { id: 103, nombre: 'Paciente', apellidos: '3', riesgo: 'alto', discapacidad: 'fisica', en_seguimiento: true, citas: [], notas: [], recomendaciones: [] },
    { id: 104, nombre: 'Paciente', apellidos: '4', riesgo: 'bajo', discapacidad: 'sensorial', en_seguimiento: false, citas: [], notas: [], recomendaciones: [] }
  ];

  getPacientes(): Paciente[] {
    return [...this.pacientesDB];
  }

  getPacientePorId(id: number): Paciente | undefined {
    const paciente = this.pacientesDB.find(p => p.id === id);
    return paciente ? { ...paciente } : undefined;
  }

  agregarPaciente(nuevoPaciente: any): void {
    const maxId = this.pacientesDB.length > 0 ? Math.max(...this.pacientesDB.map(p => p.id)) : 100;
    const pacienteFinal: Paciente = {
      id: maxId + 1,
      nombre: nuevoPaciente.nombre,
      apellidos: nuevoPaciente.apellidos,
      riesgo: nuevoPaciente.riesgo,
      discapacidad: nuevoPaciente.discapacidad,
      en_seguimiento: nuevoPaciente.en_seguimiento ?? true,
      citas: [], 
      recomendaciones: [],
      notas: []
    };
    this.pacientesDB = [...this.pacientesDB, pacienteFinal];
  }

  actualizarPaciente(id: number, datosActualizados: Partial<Paciente>): void {
    const index = this.pacientesDB.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pacientesDB[index] = { ...this.pacientesDB[index], ...datosActualizados };
      this.pacientesDB = [...this.pacientesDB];
    }
  }

  eliminarPaciente(id: number): void {
    this.pacientesDB = this.pacientesDB.filter(p => p.id !== id);
  }

  filtrarPacientes(filtros: { nombre?: string, riesgo?: string, discapacidad?: string, en_seguimiento?: boolean }): Paciente[] {
    return this.pacientesDB.filter(paciente => {
      let coincide = true;
      if (filtros.nombre) {
        const terminoBusqueda = filtros.nombre.toLowerCase();
        const nombreCompleto = `${paciente.nombre} ${paciente.apellidos}`.toLowerCase();
        coincide = coincide && nombreCompleto.includes(terminoBusqueda);
      }
      if (filtros.riesgo) coincide = coincide && paciente.riesgo === filtros.riesgo;
      if (filtros.discapacidad) coincide = coincide && paciente.discapacidad === filtros.discapacidad;
      if (filtros.en_seguimiento !== undefined) coincide = coincide && paciente.en_seguimiento === filtros.en_seguimiento;
      return coincide;
    });
  }

  getCitas(pacienteId: number): Cita[] {
    const paciente = this.getPacientePorId(pacienteId);
    return paciente?.citas ? [...paciente.citas] : [];
  }

  getCitaPorId(pacienteId: number, citaId: number): Cita | undefined {
    return this.getCitas(pacienteId).find(c => c.id === citaId);
  }

  agregarCita(pacienteId: number, nuevaCita: any): void {
    const index = this.pacientesDB.findIndex(p => p.id === pacienteId);
    if (index !== -1) {
      const citas = this.pacientesDB[index].citas || [];
      const maxCitaId = citas.length > 0 ? Math.max(...citas.map(c => c.id)) : 0;
      const citaFinal = { estado: 'pendiente', ...nuevaCita, id: maxCitaId + 1 };
      
      this.pacientesDB[index] = {
        ...this.pacientesDB[index],
        citas: [...citas, citaFinal]
      };
    }
  }

  actualizarCita(pacienteId: number, citaId: number, datosActualizados: Partial<Cita>): void {
    const index = this.pacientesDB.findIndex(p => p.id === pacienteId);
    if (index !== -1) {
      const citas = this.pacientesDB[index].citas || [];
      const citasActualizadas = citas.map(c => c.id === citaId ? { ...c, ...datosActualizados } : c);
      
      this.pacientesDB[index] = {
        ...this.pacientesDB[index],
        citas: citasActualizadas
      };
    }
  }

  eliminarCita(pacienteId: number, citaId: number): void {
    const index = this.pacientesDB.findIndex(p => p.id === pacienteId);
    if (index !== -1) {
      const citas = this.pacientesDB[index].citas || [];
      this.pacientesDB[index] = {
        ...this.pacientesDB[index],
        citas: citas.filter(c => c.id !== citaId)
      };
    }
  }

  getNotas(pacienteId: number): Nota[] {
    const paciente = this.getPacientePorId(pacienteId);
    return paciente?.notas ? [...paciente.notas] : [];
  }

  getNotaById(pacienteId: number, notaId: number): Nota | undefined {
    return this.getNotas(pacienteId).find(n => n.id === notaId);
  }

  agregarNota(pacienteId: number, contenido: string): void {
    const index = this.pacientesDB.findIndex(p => p.id === pacienteId);
    if (index !== -1) {
      const notas = this.pacientesDB[index].notas || [];
      const maxNotaId = notas.length > 0 ? Math.max(...notas.map(n => n.id)) : 0;
      const nuevaNota: Nota = { id: maxNotaId + 1, contenido };
      
      this.pacientesDB[index] = {
        ...this.pacientesDB[index],
        notas: [...notas, nuevaNota]
      };
    }
  }

  actualizarNota(pacienteId: number, notaId: number, nuevoContenido: string): void {
    const index = this.pacientesDB.findIndex(p => p.id === pacienteId);
    if (index !== -1) {
      const notas = this.pacientesDB[index].notas || [];
      const notasActualizadas = notas.map(n => n.id === notaId ? { ...n, contenido: nuevoContenido } : n);
      
      this.pacientesDB[index] = {
        ...this.pacientesDB[index],
        notas: notasActualizadas
      };
    }
  }

  eliminarNota(pacienteId: number, notaId: number): void {
    const index = this.pacientesDB.findIndex(p => p.id === pacienteId);
    if (index !== -1) {
      const notas = this.pacientesDB[index].notas || [];
      this.pacientesDB[index] = {
        ...this.pacientesDB[index],
        notas: notas.filter(n => n.id !== notaId)
      };
    }
  }

  getRecomendaciones(pacienteId: number): Recomendacion[] {
    const paciente = this.getPacientePorId(pacienteId);
    return paciente?.recomendaciones ? [...paciente.recomendaciones] : [];
  }

  agregarRecomendacion(pacienteId: number, recomendacion: Omit<Recomendacion, 'id'>): void {
    const index = this.pacientesDB.findIndex(p => p.id === pacienteId);
    if (index !== -1) {
      const recomendaciones = this.pacientesDB[index].recomendaciones || [];
      const maxId = recomendaciones.length > 0 ? Math.max(...recomendaciones.map(r => r.id)) : 0;
      
      this.pacientesDB[index] = {
        ...this.pacientesDB[index],
        recomendaciones: [...recomendaciones, { id: maxId + 1, ...recomendacion }]
      };
    }
  }

  eliminarRecomendacion(pacienteId: number, recId: number): void {
    const index = this.pacientesDB.findIndex(p => p.id === pacienteId);
    if (index !== -1) {
      const recomendaciones = this.pacientesDB[index].recomendaciones || [];
      this.pacientesDB[index] = {
        ...this.pacientesDB[index],
        recomendaciones: recomendaciones.filter(r => r.id !== recId)
      };
    }
  }
}
