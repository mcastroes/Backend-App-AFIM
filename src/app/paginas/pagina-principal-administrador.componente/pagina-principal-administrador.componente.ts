import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaComponent } from '../../componentes/alerta.componente/alerta.componente/alerta.componente';
import { CalendarioComponent } from '../../componentes/calendario.componente/calendario.componente/calendario.componente';

@Component({
  selector: 'app-pagina-principal-administrador',
  standalone: true,
  imports: [AlertaComponent, CalendarioComponent],
  templateUrl: './pagina-principal-administrador.componente.html',
  styleUrl: './pagina-principal-administrador.componente.css'
})
export class PaginaPrincipalAdministradorComponent {
  
  private router = inject(Router);

  showAlert: boolean = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'n') {
      this.showAlert = true;
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
