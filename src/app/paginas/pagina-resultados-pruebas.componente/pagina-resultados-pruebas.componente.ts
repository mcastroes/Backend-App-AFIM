import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../servicios/paciente.serv/paciente.serv';
import { ResultadosPruebasComponent } from '../../componentes/resultados-pruebas.componente/resultados-pruebas.componente';
import { Paciente } from '../../interfaces/paciente/paciente';

@Component({
  selector: 'app-pagina-resultados-pruebas',
  standalone: true,
  imports: [CommonModule, ResultadosPruebasComponent],
  templateUrl: './pagina-resultados-pruebas.componente.html',
})
export class PaginaResultadosPruebasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pacienteService = inject(PacienteService);

  public paciente = signal<Paciente | undefined>(undefined);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.paciente.set(this.pacienteService.getPacientePorId(id));
    }
  }

  volver(): void {
    const id = this.paciente()?.id;
    if (id) {
      this.router.navigate(['/admin/pagina-detalle-paciente', id]);
    }
  }
}
