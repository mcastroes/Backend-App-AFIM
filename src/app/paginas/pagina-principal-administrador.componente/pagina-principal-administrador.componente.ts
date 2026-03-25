import { Component, HostListener, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaComponent } from '../../componentes/alerta.componente/alerta.componente/alerta.componente';
import { CalendarioComponent } from '../../componentes/calendario.componente/calendario.componente/calendario.componente';
import { PacienteService } from '../../servicios/paciente.serv/paciente.serv';
import { CalendarioService } from '../../servicios/calendario.serv/calendario.serv';

@Component({
  selector: 'app-pagina-principal-administrador',
  standalone: true,
  imports: [AlertaComponent, CalendarioComponent],
  templateUrl: './pagina-principal-administrador.componente.html',
  styleUrl: './pagina-principal-administrador.componente.css'
})
export class PaginaPrincipalAdministradorComponent implements OnInit {
  
  private router = inject(Router);
  private _pacienteServ = inject(PacienteService);
  public calendarioServ = inject(CalendarioService);

  showAlert = signal<boolean>(false);
  diaSeleccionado = signal<number>(new Date().getDate());
  listaPacientes = signal<any[]>([]);

  citasDelDia = computed(() => {
    const diaSel = this.diaSeleccionado();
    const fechaVista = this.calendarioServ.fechaActual();
    const mesSel = fechaVista.getMonth();
    const anioSel = fechaVista.getFullYear();
    
    const citasVista: any[] = [];

    this.listaPacientes().forEach(paciente => {
      if (paciente.citas?.length > 0) {
        paciente.citas.forEach((cita: any) => {
          if (cita.dia === diaSel && cita.mes === mesSel && cita.anio === anioSel) {
            citasVista.push({
              hora: cita.hora,
              nombrePaciente: `${paciente.nombre} ${paciente.apellidos}`
            });
          }
        });
      }
    });

    return citasVista.sort((a, b) => a.hora.localeCompare(b.hora));
  });

  diasConCitas = computed(() => {
    const fechaVista = this.calendarioServ.fechaActual();
    const mesSel = fechaVista.getMonth();
    const anioSel = fechaVista.getFullYear();
    const diasOcupados = new Set<number>();

    this.listaPacientes().forEach(p => {
      p.citas?.forEach((c: any) => {
        if (c.mes === mesSel && c.anio === anioSel) {
          diasOcupados.add(c.dia);
        }
      });
    });
    return Array.from(diasOcupados);
  });

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'n') {
      this.showAlert.set(true);
    }
  }

  ngOnInit(): void {
    this.listaPacientes.set(this._pacienteServ.getPacientes());
  }

  procesarDiaSeleccionado(dia: number): void {
    this.diaSeleccionado.set(dia);
  }

  procesarNuevaCita(datos: {dia: number, hora: string, id_paciente: number}): void {
    const fechaVista = this.calendarioServ.fechaActual();
    
    this._pacienteServ.agregarCita(datos.id_paciente, {
      dia: datos.dia,
      mes: fechaVista.getMonth(),
      anio: fechaVista.getFullYear(),
      hora: datos.hora
    });
    
    this.listaPacientes.set(this._pacienteServ.getPacientes());
    this.diaSeleccionado.set(datos.dia); 
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
