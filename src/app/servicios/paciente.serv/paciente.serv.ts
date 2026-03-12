import { Injectable } from '@angular/core';
import { Paciente } from '../../interfaces/paciente/paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private pacientesDB: Paciente[] = [
    { id: 101, nombre: 'María', apellidos: 'López' },
    { id: 102, nombre: 'Juan', apellidos: 'Pérez' },
    { id: 103, nombre: 'Ana', apellidos: 'García' },
    { id: 104, nombre: 'Luis', apellidos: 'Miguel' }
  ];

  getPacientes(): Paciente[] {
    return this.pacientesDB;
  }

  getPacientePorId(id: number): Paciente | undefined {
    return this.pacientesDB.find(paciente => paciente.id === id);
  }

  agregarPaciente(nuevoPaciente: Paciente): void {
    if (!nuevoPaciente.id) {
      const maxId = this.pacientesDB.length > 0 
        ? Math.max(...this.pacientesDB.map(p => p.id)) 
        : 100;
      
      nuevoPaciente.id = maxId + 1;
    }
    
    this.pacientesDB.push(nuevoPaciente);
  }
  
}
