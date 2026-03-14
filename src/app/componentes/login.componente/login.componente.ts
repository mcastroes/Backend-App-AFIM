import { Component, input, output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.componente.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  isLoading = input<boolean>(false);
  messageType = input<'hidden' | 'error' | 'success'>('hidden');
  message = input<string>('');

  submitPasscode = output<string>();

  loginForm = this.fb.group({
    passcode: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitPasscode.emit(this.loginForm.value.passcode!);
    }
  }
}
