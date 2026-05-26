import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../servicios/paciente.serv/paciente.serv';
import { AuthService } from '../../servicios/auth.serv/auth-serv';

@Component({
  selector: 'app-pagina-principal-usuario',
  standalone: true,
  templateUrl: './pagina-principal-usuario.componente.html'
})
export class PaginaPrincipalUsuarioComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pacienteService = inject(PacienteService);
  private authService = inject(AuthService);

  nombreUsuario = signal<string>('');
  idUsuario = signal<number | null>(null);

  ngOnInit() {
    const id = this.authService.obtenerIdPacienteActual();

    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.pacienteService.getPacientePorId(id).subscribe({
      next: (paciente) => {
        this.idUsuario.set(id);
        this.nombreUsuario.set(`${paciente.nombre} ${paciente.apellidos}`);
      },
      error: () => this.router.navigate(['/'])
    });
  }

  volver() {
    this.router.navigate(['/']);
  }

  abrirConfiguracion() {}
  irACuestionarios() {}

  irAPruebas() {
    if (this.idUsuario()) {
      this.router.navigate(['/usuario/pagina-seleccion-prueba', this.idUsuario()]);
    }
  }
}