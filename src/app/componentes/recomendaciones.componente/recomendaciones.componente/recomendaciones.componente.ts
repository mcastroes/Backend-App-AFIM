import { Component, input, output, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Recomendacion } from '../../../interfaces/paciente/paciente';

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recomendaciones.componente.html'
})
export class RecomendacionesComponent {
  private fb = inject(FormBuilder);

  recomendaciones = input.required<Recomendacion[]>();
  nuevaRecomendacion = output<{titulo: string, contenido: string}>();

  showModal = signal(false);

  recomendacionForm = this.fb.nonNullable.group({
    titulo: ['', [Validators.required]],
    contenido: ['', [Validators.required]]
  });

  abrirModal(): void {
    this.recomendacionForm.reset();
    this.showModal.set(true);
  }

  cerrarModal(): void {
    this.showModal.set(false);
  }

  onGuardar(): void {
    if (this.recomendacionForm.valid) {
      this.nuevaRecomendacion.emit(this.recomendacionForm.getRawValue());
      this.cerrarModal();
    } else {
      this.recomendacionForm.markAllAsTouched();
    }
  }
}