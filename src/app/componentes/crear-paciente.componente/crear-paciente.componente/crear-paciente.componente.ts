import { Component, output, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Paciente } from '../../../interfaces/paciente/paciente';

export type NuevoPaciente = Pick<Paciente, 'nombre' | 'apellidos' | 'riesgo' | 'discapacidad'>;

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-paciente.componente.html'
})
export class CrearPacienteComponent {
  private fb = inject(FormBuilder);

  cerrar = output<void>();
  guardar = output<NuevoPaciente>();

  showModal = signal(true); 

  pacienteForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required]],
    riesgo: ['' as 'bajo' | 'medio' | 'alto', [Validators.required]],
    discapacidad: ['ninguna' as string, [Validators.required]]
  });

  abrirModal(): void {
    this.pacienteForm.reset();
    this.showModal.set(true);
  }

  cerrarModal(): void {
    this.showModal.set(false);
    this.cerrar.emit();
  }

  onGuardar(): void {
    if (this.pacienteForm.valid) {
      this.guardar.emit(this.pacienteForm.getRawValue() as NuevoPaciente);
      this.cerrarModal();
    } else {
      this.pacienteForm.markAllAsTouched();
    }
  }
}
