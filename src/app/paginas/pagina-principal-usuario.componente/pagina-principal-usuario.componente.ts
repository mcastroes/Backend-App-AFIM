import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../servicios/paciente.serv/paciente.serv';

@Component({
  selector: 'app-pagina-principal-usuario',
  standalone: true,
  templateUrl: './pagina-principal-usuario.componente.html'
})
export class PaginaPrincipalUsuarioComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pacienteService = inject(PacienteService);

  nombreUsuario = signal<string>('');
  idUsuario = signal<number | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const paciente = this.pacienteService.getPacientePorId(id);

    if (paciente) {
      this.idUsuario.set(id);
      this.nombreUsuario.set(`${paciente.nombre} ${paciente.apellidos}`);
    } else {
      this.router.navigate(['/']);
    }
  }

  volver() {
    this.router.navigate(['/']);
  }

  abrirConfiguracion() {
  }

  irACuestionarios() {
  }

  irAPruebas() {
    if (this.idUsuario()) {
      this.router.navigate(['/usuario/pagina-seleccion-prueba', this.idUsuario()]);
    }
  }
}