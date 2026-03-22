import { Component, input, output, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recomendacion } from '../../../interfaces/paciente/paciente';

@Component({
  selector: 'app-recomendaciones',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recomendaciones.componente.html'
})
export class RecomendacionesComponent {
  recomendaciones = input.required<Recomendacion[]>();
  nuevaRecomendacion = output<{titulo: string, contenido: string}>();

  mostrandoFormulario = signal(false);
  private fb = inject(FormBuilder);

  recomendacionForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    contenido: ['', [Validators.required]]
  });

  abrirFormulario(): void {
    this.recomendacionForm.reset();
    this.mostrandoFormulario.set(true);
  }

  cerrarFormulario(): void {
    this.mostrandoFormulario.set(false);
  }

  onGuardar(): void {
    if (this.recomendacionForm.valid) {
      this.nuevaRecomendacion.emit(this.recomendacionForm.value);
      this.cerrarFormulario();
    } else {
      this.recomendacionForm.markAllAsTouched();
    }
  }
}