import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../servicios/paciente.serv/paciente.serv';
import { Paciente } from '../../../interfaces/paciente/paciente';
import { CitasComponent } from '../../../componentes/citas.componente/citas.componente/citas.componente';
import { CaracteristicasPacienteComponent } from '../../../componentes/caracteristicas-paciente.componente/caracteristicas-paciente.componente/caracteristicas-paciente.componente';

@Component({
  selector: 'app-pagina-datos-paciente',
  standalone: true,
  imports: [CitasComponent, CaracteristicasPacienteComponent],
  templateUrl: './pagina-datos-paciente.componente.html'
})
export class PaginaDatosPacienteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _pacienteServ = inject(PacienteService);

  paciente = signal<Paciente | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      const data = this._pacienteServ.getPacientePorId(id);
      if (data) {
        this.paciente.set(data);
      } else {
        this.volver();
      }
    }
  }

  volver(): void {
    this.router.navigate(['/admin/pagina-detalle-paciente', this.paciente()?.id]);
  }

  actualizarEstadoCita(evento: {id: number, nuevoEstado: any}): void {
    const pActual = this.paciente();
    if (!pActual) return;

    this._pacienteServ.actualizarCita(pActual.id, evento.id, { estado: evento.nuevoEstado });

    this.paciente.update(p => {
      if (!p) return null;
      return {
        ...p,
        citas: p.citas.map(cita => 
          cita.id === evento.id 
            ? { ...cita, estado: evento.nuevoEstado } 
            : cita
        )
      };
    });
  }
}
