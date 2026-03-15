import { Component, output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-paciente.componente.html',
  styleUrl: './crear-paciente.componente.css',
})
export class CrearPacienteComponent {
  cerrar = output<void>();
  guardar = output<any>();

  private fb = inject(FormBuilder);

  pacienteForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required]],
    riesgo: ['', [Validators.required]],
    discapacidad: ['']
  });

  onGuardar(): void {
    if (this.pacienteForm.valid) {
      this.guardar.emit(this.pacienteForm.value);
    } else {
      this.pacienteForm.markAllAsTouched();
    }
  }

  onCancelar(): void {
    this.cerrar.emit();
  }

}
