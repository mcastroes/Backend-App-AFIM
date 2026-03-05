import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.serv/auth-serv';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.componente.html',
  styleUrl: './login.componente.css',
})
export class LoginComponente {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  message = signal<string>('');
  messageType = signal<'hidden' | 'error' | 'success'>('hidden');
  isLoading = signal<boolean>(false);

  loginForm: FormGroup = this.fb.group({
    passcode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.message.set('Por favor, ingresa un código válido.');
      this.messageType.set('error');
      return;
    }

    this.isLoading.set(true);
    this.message.set('Verificando acceso...');
    this.messageType.set('success');

    const codigo = this.loginForm.get('passcode')?.value.trim();

    this.authService.verificarCodigo(codigo).subscribe((response) => {
      this.isLoading.set(false);

      if (response.success) {
        if (response.role === 'admin') {
          this.router.navigate(['/pagina-principal']);
        } else {
          this.router.navigate(['/pagina-principal-usuario']);
        }
      } else {
        this.message.set('El código es incorrecto.');
        this.messageType.set('error');
      }
    });
  }
}
