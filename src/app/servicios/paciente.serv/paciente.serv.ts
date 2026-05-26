import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paciente, Nota, Recomendacion } from '../../interfaces/paciente/paciente';
import { ResultadoPrueba } from '../../interfaces/test_paciente/test_paciente';
import { Cita } from '../../interfaces/cita/cita';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/pacientes`;

  // ── PACIENTES ──────────────────────────────────────────────
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.api);
  }

  getPacientePorId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.api}/${id}`);
  }

  agregarPaciente(p: Partial<Paciente>): Observable<Paciente> {
    return this.http.post<Paciente>(this.api, p);
  }

  actualizarPaciente(id: number, datos: Partial<Paciente>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.api}/${id}`, datos);
  }

  eliminarPaciente(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  // ── RESULTADOS PRUEBA ───────────────────────────────────────
  agregarResultadoPrueba(pacienteId: number, resultado: ResultadoPrueba): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.api}/${pacienteId}/resultados`, resultado);
  }

  // ── NOTAS ──────────────────────────────────────────────────
  getNotas(pacienteId: number): Observable<Nota[]> {
    return this.http.get<Nota[]>(`${this.api}/${pacienteId}/notas`);
  }

  agregarNota(pacienteId: number, contenido: string): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.api}/${pacienteId}/notas`, { contenido });
  }

  actualizarNota(pacienteId: number, notaId: number, contenido: string): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.api}/${pacienteId}/notas/${notaId}`, { contenido });
  }

  eliminarNota(pacienteId: number, notaId: number): Observable<any> {
    return this.http.delete(`${this.api}/${pacienteId}/notas/${notaId}`);
  }

  // ── CITAS ──────────────────────────────────────────────────
  getCitas(pacienteId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.api}/${pacienteId}/citas`);
  }

  agregarCita(pacienteId: number, cita: Partial<Cita>): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.api}/${pacienteId}/citas`, cita);
  }

  actualizarCita(pacienteId: number, citaId: number, datos: Partial<Cita>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.api}/${pacienteId}/citas/${citaId}`, datos);
  }

  eliminarCita(pacienteId: number, citaId: number): Observable<any> {
    return this.http.delete(`${this.api}/${pacienteId}/citas/${citaId}`);
  }

  // ── RECOMENDACIONES ────────────────────────────────────────
  getRecomendaciones(pacienteId: number): Observable<Recomendacion[]> {
    return this.http.get<Recomendacion[]>(`${this.api}/${pacienteId}/recomendaciones`);
  }

  agregarRecomendacion(pacienteId: number, rec: Omit<Recomendacion, 'id'>): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.api}/${pacienteId}/recomendaciones`, rec);
  }

  eliminarRecomendacion(pacienteId: number, recId: number): Observable<any> {
    return this.http.delete(`${this.api}/${pacienteId}/recomendaciones/${recId}`);
  }
}