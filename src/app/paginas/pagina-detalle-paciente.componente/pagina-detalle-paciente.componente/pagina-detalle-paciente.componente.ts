import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../servicios/paciente.serv/paciente.serv';
import { Paciente, Nota } from '../../../interfaces/paciente/paciente';
import { GraficoComponent } from '../../../componentes/grafico.componente/grafico.componente/grafico.componente';
import { NotasComponent } from '../../../componentes/notas.componente/notas.componente/notas.componente';

@Component({
  selector: 'app-pagina-detalle-paciente',
  standalone: true,
  imports: [GraficoComponent, NotasComponent],
  templateUrl: './pagina-detalle-paciente.componente.html'
})
export class PaginaDetallePacienteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _pacienteServ = inject(PacienteService);

  paciente = signal<Paciente | null>(null);
  notasDelPaciente = signal<Nota[]>([]);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      const data = this._pacienteServ.getPacientePorId(id);
      if (data) {
        this.paciente.set(data);
        this.notasDelPaciente.set(this._pacienteServ.getNotas(id));
      } else {
        this.volver();
      }
    }
  }

  volver(): void {
    this.router.navigate(['/admin/pagina-indice-pacientes']);
  }

  irADatos(id: number): void {
    this.router.navigate(['/admin/pagina-datos-paciente', id]);
  }

  procesarNuevaNota(): void {
    const nueva = prompt('Escribe la nueva nota para el paciente:');
    const p = this.paciente();
    if (nueva && nueva.trim() !== '' && p) {
      this._pacienteServ.agregarNota(p.id, nueva);
      this.notasDelPaciente.set(this._pacienteServ.getNotas(p.id));
    }
  }
}
