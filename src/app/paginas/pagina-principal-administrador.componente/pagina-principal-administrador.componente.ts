import { Component, HostListener, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaComponent } from '../../componentes/alerta.componente/alerta.componente/alerta.componente';
import { CalendarioComponent } from '../../componentes/calendario.componente/calendario.componente/calendario.componente';
import { CitaService } from '../../servicios/cita.serv/cita.serv'; 
import { PacienteService } from '../../servicios/paciente.serv/paciente.serv'; 

@Component({
  selector: 'app-pagina-principal-administrador',
  standalone: true,
  imports: [AlertaComponent, CalendarioComponent],
  templateUrl: './pagina-principal-administrador.componente.html',
  styleUrl: './pagina-principal-administrador.componente.css'
})
export class PaginaPrincipalAdministradorComponent implements OnInit {
  
  private router = inject(Router);
  private _citaServ = inject(CitaService);
  private _pacienteServ = inject(PacienteService);

  showAlert = signal<boolean>(false);
  diaSeleccionado = signal<number>(0);
  listaPacientes = signal<any[]>([]);
  diasConCitas = signal<number[]>([]);

  citasDelDia = computed(() => {
    return this._citaServ.getCitasVistaPorDia(this.diaSeleccionado());
  });

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'n') {
      this.showAlert.set(true);
    }
  }

  ngOnInit(): void {
    this.listaPacientes.set(this._pacienteServ.getPacientes());
    this.diasConCitas.set([5, 12, 24]); 
  }

  procesarDiaSeleccionado(dia: number): void {
    this.diaSeleccionado.set(dia);
  }

  procesarNuevaCita(datos: {dia: number, hora: string, id_paciente: number}): void {
    this._citaServ.agregarCita(datos.dia, datos.hora, datos.id_paciente);
    
    this.diaSeleccionado.set(datos.dia); 
    if (!this.diasConCitas().includes(datos.dia)) {
      this.diasConCitas.update(dias => [...dias, datos.dia]);
    }
  }

  volver() {
    this.router.navigate(['/login']); 
  }

  irAGestionProfesionales() {
    this.router.navigate(['/admin-profesionales']);
  }

  irAGestionUsuarios() {
    this.router.navigate(['/admin/pagina-indice-pacientes']);
  }

  irAEstadisticas() {
    this.router.navigate(['/admin-estadisticas']);
  }
}
