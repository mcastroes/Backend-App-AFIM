import { Component, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TestRunnerComponent } from '../../../componentes/test-runner-componente.componente/test-runner-componente.componente';
import { PacienteService } from '../../../servicios/paciente.serv/paciente.serv';

@Component({
  selector: 'app-seleccion-prueba',
  standalone: true,
  imports: [TestRunnerComponent],
  templateUrl: './pagina-seleccion-prueba.componente.html'
})
export class SeleccionPruebaComponent implements OnInit {
  
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private pacienteService = inject(PacienteService);

  nombreUsuario = signal<string>('');
  idUsuario = signal<number | null>(null);
  mostrar7Minutos = signal<boolean>(false);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const paciente = this.pacienteService.getPacientePorId(id);

      if (paciente) {
        this.idUsuario.set(id);
        this.nombreUsuario.set(`${paciente.nombre} ${paciente.apellidos}`);
        this.mostrar7Minutos.set(false);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  volver(): void {
    if (this.mostrar7Minutos()) {
      this.mostrar7Minutos.set(false);
    } else {
      this.location.back();
    }
  }

  abrirConfiguracion(): void {
    this.router.navigate(['/configuracion']);
  }

  irATrailMaking(): void {
  }

  irA7Minutos(): void {
    this.mostrar7Minutos.set(true);
  }
}