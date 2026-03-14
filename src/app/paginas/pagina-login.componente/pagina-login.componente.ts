import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../../componentes/login.componente/login.componente';
import { AuthService } from '../../servicios/auth.serv/auth-serv';

@Component({
  selector: 'app-pagina-login',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './pagina-login.componente.html'
})
export class PaginaLoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoading = signal<boolean>(false);
  messageType = signal<'hidden' | 'error' | 'success'>('hidden');
  message = signal<string>('');

  procesarLogin(passcode: string) {
    this.isLoading.set(true);
    this.messageType.set('hidden');

    this.authService.verificarCodigo(passcode).subscribe({
      next: (resultado) => {
        this.isLoading.set(false);

        if (resultado.success) {
          if (resultado.role === 'admin') {
            this.router.navigate(['admin/pagina-principal']);
          } else if (resultado.role === 'user') {
            this.router.navigate(['usuario/pagina-principal-usuario']);
          }
        } else {
          this.messageType.set('error');
          this.message.set('Código incorrecto. Inténtalo de nuevo.');
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.messageType.set('error');
        this.message.set('Error de conexión.');
      }
    });
  }
}
