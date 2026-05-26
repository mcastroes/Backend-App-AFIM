import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../servicios/paciente.serv/paciente.serv';
import { Paciente } from '../../../interfaces/paciente/paciente';
import { RecomendacionesComponent } from '../../../componentes/recomendaciones.componente/recomendaciones.componente/recomendaciones.componente';

@Component({
  selector: 'app-pagina-recomendaciones',
  standalone: true,
  imports: [RecomendacionesComponent],
  templateUrl: './pagina-recomendaciones.componente.html'
})
export class PaginaRecomendacionesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _pacienteServ = inject(PacienteService);

  paciente = signal<Paciente | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.cargarPaciente(parseInt(idParam, 10));
    }
  }

  cargarPaciente(id: number): void {
    this._pacienteServ.getPacientePorId(id).subscribe({
      next: (data) => this.paciente.set(data),
      error: () => this.volver()
    });
  }

  volver(): void {
    const id = this.paciente()?.id;
    if (id) {
      this.router.navigate(['/admin/pagina-detalle-paciente', id]);
    }
  }

  crearRecomendacion(datos: {titulo: string, contenido: string}): void {
    const pActual = this.paciente();
    if (pActual) {
      this._pacienteServ.agregarRecomendacion(pActual.id, datos).subscribe(() => {
        this.cargarPaciente(pActual.id);
      });
    }
  }
}