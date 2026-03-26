import { Injectable, inject } from '@angular/core';
import { Observable, of, delay } from 'rxjs'; 
import { PacienteService } from '../paciente.serv/paciente.serv';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private pacienteService = inject(PacienteService);
  private readonly SESSION_KEY = 'paciente_logueado_id';

  verificarCodigo(passcode: string): Observable<{ success: boolean, role?: string, userId?: number }> {
    if (passcode === "1") {
      return of({ success: true, role: 'admin' }).pipe(delay(1000));
    } 
    
    const idNumerico = Number(passcode);
    const paciente = this.pacienteService.getPacientePorId(idNumerico);

    if (paciente) {
      localStorage.setItem(this.SESSION_KEY, idNumerico.toString());
      return of({ success: true, role: 'user', userId: idNumerico }).pipe(delay(1000));
    }

    return of({ success: false }).pipe(delay(500));
  }

  obtenerIdPacienteActual(): number | null {
    const idGuardado = localStorage.getItem(this.SESSION_KEY);
    return idGuardado ? Number(idGuardado) : null;
  }

  cerrarSesionUsuario(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
